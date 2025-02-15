import React, { useEffect, useState } from 'react';
import Case, { CaseProps } from '../ui/Case';
import Item, { ItemProps } from '../ui/Item';

interface ToggleCasesContentProps {
  selectedCase: CaseProps | null;
  setSelectedCase: React.Dispatch<React.SetStateAction<CaseProps | null>>;
  setShowRoulette: React.Dispatch<React.SetStateAction<boolean>>;
  showRoulette: boolean;
}

const ToggleCasesContent = ({
  selectedCase,
  setSelectedCase,
  setShowRoulette,
}: ToggleCasesContentProps) => {
  const [cases, setCases] = useState<CaseProps[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedTab, setSelectedTab] = useState('cases');
  const [loadingCases, setLoadingCases] = useState<boolean>(true);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка кейсов
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoadingCases(true);
        const response = await fetch('https://9lsgnf1b-3000.euw.devtunnels.ms/cases/cases');
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];

        if (Array.isArray(parsedData)) {
          setCases(parsedData);
          if (!selectedCase) {
            setSelectedCase(parsedData[0] || null);
          }
        } else {
          throw new Error('Ошибка данных: ожидается массив');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoadingCases(false);
      }
    };

    fetchCases();
  }, []);

  // Загрузка предметов
  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedCase) return;

      try {
        setLoadingItems(true);
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/cases/weapons/${selectedCase.id}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];

        if (Array.isArray(parsedData)) {
          setItems(parsedData);
        } else {
          throw new Error('Ошибка данных: ожидается массив');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoadingItems(false);
      }
    };

    if (selectedTab === 'content' && selectedCase) {
      fetchItems();
    }
  }, [selectedTab, selectedCase?.id]);

  const handleCaseClick = (caseItem: CaseProps) => {
    if (selectedCase?.id !== caseItem.id) {
      setSelectedCase(caseItem);
      setShowRoulette(false);
    }
  };

  const handleTabClick = (tab: string) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
      setError(null);
    }
  };

  const renderCases = () => (
    <div className="flex flex-wrap justify-center gap-2 pt-4">
      {loadingCases ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <p className="text-white">Загрузка кейсов...</p>
        </div>
      ) : (
        cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className={`w-16 h-16 rounded-lg flex items-center justify-center p-0 ${selectedCase?.id === caseItem.id ? 'shadow-lg' : ''
              }`}
            onClick={() => handleCaseClick(caseItem)}
          >
            <Case id={caseItem.id} name={caseItem.name} image={caseItem.image} />
          </div>
        ))
      )}
    </div>
  );

  const renderItems = () => (
    <div className="flex flex-wrap justify-center gap-2 pt-4">
      {loadingItems ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <p className="text-white">Загрузка предметов...</p>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="relative w-20 h-20">
            <Item
              id={item.id}
              weapon_name={item.weapon_name}
              skin_name={item.skin_name}
              rarity={item.rarity}
              steam_image={item.steam_image}
              isLoser={false}
            />
            <div className="absolute bottom-1 w-full bg-gray-800 text-white text-xs text-center py-1">
              <p className="truncate">{item.weapon_name}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleTabClick('cases')}
          className={`w-1/2 py-1 rounded-t-lg text-white text-xs ${selectedTab === 'cases' ? 'bg-gray-900' : 'bg-gray-700'}`}
        >
          Кейсы
        </button>
        <button
          onClick={() => handleTabClick('content')}
          className={`w-1/2 py-1 rounded-t-lg text-white text-xs ${selectedTab === 'content' ? 'bg-gray-900' : 'bg-gray-700'}`}
        >
          Содержимое
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="min-h-screen bg-gray-900">
        {selectedTab === 'cases' ? renderCases() : renderItems()}
      </div>
    </div>
  );
};

export default ToggleCasesContent;
