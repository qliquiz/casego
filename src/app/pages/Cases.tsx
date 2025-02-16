import { useRef, useState, useEffect } from 'react';
import { CasesProps } from '../types/CasesProps';
import { CaseProps } from '../types/CaseProps';
import { useUser } from '../hooks/useUser';
import { useSpin } from '../hooks/useSpin';
import { Spinner } from '../types/Spinner';
import { ItemProps } from '../types/ItemProps';
import ToggleCasesContent from '../components/common/ToggleCasesContent';
import Item from '../components/ui/Item';
import Case from '../components/ui/Case';

const Cases = ({ weaponsCount, transitionDuration }: CasesProps) => {
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const spinnerContainerRef = useRef<HTMLDivElement | null>(null);
  const weaponsRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { weapons, loading, error } = useSpin(selectedCase?.id || null);

  function transitionEndHandler() {
    setIsSpin(false);
    setIsSpinEnd(true);
  }

  async function play() {
    if (!selectedCase || !user?.id || weapons.length === 0) return;
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

    spinner.set_weapons();
    
    setTimeout(() => {
      setWeaponPrizeId(spinner.spin());
    }, 100);
  }

  useEffect(() => {
    setIsSpin(false);
    setIsSpinEnd(false);
    setWeaponPrizeId(-1);
  }, [selectedCase]);

  return (
    <div className='flex flex-col items-center p-4 text-white'>
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
      ) : (
        <p className='text-gray-400'>Выберите кейс</p>
      )}

      <button
        className='mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50'
        disabled={!selectedCase || !user?.id || loading}
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

      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
};

export default Cases;
