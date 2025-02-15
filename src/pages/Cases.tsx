import { useRef, useState, useEffect } from 'react';
import { RouletteClass, WeaponAttributes } from '../roulette.classes';
import ToggleCasesContent from '../components/layout/ToggleCasesContent';
import Case, { CaseProps } from '../components/ui/Case';
import { useUser } from '../contexts/UserContext';
import Item from '../components/ui/Item';

interface CasesProps {
  weaponsCount: number;
  transitionDuration: number;
}

const Cases = ({ weaponsCount, transitionDuration }: CasesProps) => {
  const [rouletteWeapons, setRouletteWeapons] = useState<WeaponAttributes[]>([]);
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const rouletteContainerRef = useRef<HTMLDivElement | null>(null);
  const weaponsRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchCaseItems = async (caseId: number): Promise<WeaponAttributes[]> => {
    try {
      const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/cases/weapons/${caseId}`);
      if (!response.ok) throw new Error('Ошибка загрузки предметов');
      const data = await response.json();
      return JSON.parse(data.data);
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  function transitionEndHandler() {
    setIsSpin(false);
    setIsSpinEnd(true);
  }

  async function load() {
    if (!selectedCase) return null;
    const items = await fetchCaseItems(selectedCase.id);
    if (!items.length) return null;

    const winner = items[Math.floor(Math.random() * items.length)];

    const roulette = new RouletteClass({
      winner,
      caseItems: items,
      rouletteContainerRef: rouletteContainerRef as React.RefObject<HTMLDivElement>,
      weaponsRef: weaponsRef as React.RefObject<HTMLDivElement>,
      weaponsCount,
      transitionDuration
    });

    roulette.set_weapons();
    setRouletteWeapons(roulette.weapons);
    return roulette;
  }

  async function play() {
    if (!selectedCase || !user?.id) return;
    setIsSpin(true);
    setShowRoulette(true);

    const roulette = await load();
    if (!roulette) {
      setError('Ошибка загрузки предметов');
      setIsSpin(false);
      return;
    }

    setTimeout(() => {
      setWeaponPrizeId(roulette.spin());
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

      {showRoulette ? (
        <div className='relative w-full max-w-md' ref={rouletteContainerRef}>
          <div className='overflow-hidden border border-gray-600 rounded-md'>
            <div className='relative flex' ref={weaponsRef} onTransitionEnd={transitionEndHandler}>
              {rouletteWeapons.map((w, i) => (
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
        disabled={!selectedCase || !user?.id}
        onClick={play}
      >
        {isSpin ? 'Открывается...' : 'Открыть'}
      </button>

      <ToggleCasesContent
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        setShowRoulette={setShowRoulette}
        showRoulette={showRoulette}
      />

      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
};

export default Cases;
