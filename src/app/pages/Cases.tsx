import { useRef, useState, useEffect } from 'react';
import { CasesProps } from '../types/CasesProps';
import { CaseProps } from '../types/CaseProps';
import { useUser } from '../hooks/useUser';
import { useCases } from '../hooks/useCases';
import { useSpin } from '../hooks/useSpin';
import { Spinner } from '../types/Spinner';
import { ItemProps } from '../types/ItemProps';
import ToggleCasesContent from '../components/common/ToggleCasesContent';
import Item from '../components/ui/Item';
import Case from '../components/ui/Case';
import { addItemToInventory } from '../services/inventoryService';

const Cases = ({ weaponsCount, transitionDuration }: CasesProps) => {
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const spinnerContainerRef = useRef<HTMLDivElement | null>(null);
  const weaponsRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { cases, loading: loadingCases, error: casesError } = useCases();
  const { weapons, loading: loadingWeapons, error: weaponsError } = useSpin(selectedCase?.id || null);

  useEffect(() => {
    if (!selectedCase && cases.length > 0) {
      setSelectedCase(cases[0]);
    }
  }, [cases, selectedCase]);

  function transitionEndHandler() {
    setIsSpin(false);
    setIsSpinEnd(true);
  }

  async function play() {
    if (!user || !weapons.length) return;

    setIsSpin(true);
    setShowSpinner(true);

    const winner = weapons[Math.floor(Math.random() * weapons.length)];

    const spinner = new Spinner({
      winner,
      caseItems: weapons,
      spinnerContainerRef: spinnerContainerRef as React.RefObject<HTMLDivElement>,
      weaponsRef: weaponsRef as React.RefObject<HTMLDivElement>,
      weaponsCount,
      transitionDuration
    });

    spinner.setWeapons();

    await addItemToInventory(user.id, weaponPrizeId);

    setTimeout(() => {
      setWeaponPrizeId(spinner.spin());
    }, 100);

  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-14 flex flex-col items-center p-4 text-white'>
      <h2 className='text-2xl font-bold mb-4'>Cases</h2>

      {showSpinner ? (
        <div className='relative w-full max-w-md' ref={spinnerContainerRef}>
          <div className='overflow-hidden border border-gray-600 rounded-md'>
            <div className='relative flex' ref={weaponsRef} onTransitionEnd={transitionEndHandler}>
              {weapons.map((w: ItemProps, i: number) => (
                <Item key={i} isLoser={(i !== weaponPrizeId) && !isSpin && isSpinEnd} {...w} />
              ))}
            </div>
          </div>
        </div>
      ) : selectedCase ? (
        <div className='p-4 border border-gray-700 rounded-md'>
          <Case {...selectedCase} />
        </div>
      ) : loadingCases ? (
        <p className='text-gray-400'>Загрузка кейсов...</p>
      ) : casesError ? (
        <p className='text-red-500'>{casesError}</p>
      ) : (
        <p className='text-gray-400'>Нет доступных кейсов</p>
      )}

      <button
        className='mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded disabled:opacity-50'
        disabled={!selectedCase || !user?.id || loadingWeapons}
        onClick={play}
      >
        {isSpin ? 'Открывается...' : 'Открыть'}
      </button>

      <ToggleCasesContent
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        setShowSpinner={setShowSpinner}
        showSpinner={showSpinner}
      />

      {(weaponsError || casesError) && <p className='text-red-500 mt-4'>{weaponsError || casesError}</p>}
    </div>
  );
};

export default Cases;
