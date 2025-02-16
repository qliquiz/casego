import { useState } from 'react';
import { useCases } from '../../hooks/useCases';
import { useItems } from '../../hooks/useItems';
import { ToggleCasesContentProps } from '../../types/ToggleCasesContentProps';
import Case from '../ui/Case';
import Item from '../ui/Item';

const ToggleCasesContent = ({ selectedCase, setSelectedCase, setShowSpinner }: ToggleCasesContentProps) => {
  const { cases, loading: loadingCases, error: errorCases } = useCases();
  const { items, loading: loadingItems, error: errorItems } = useItems(selectedCase?.id || null);
  const [selectedTab, setSelectedTab] = useState<'cases' | 'content'>('cases');

  const handleCaseClick = (caseItem: typeof cases[number]) => {
    if (selectedCase?.id !== caseItem.id) {
      setSelectedCase(caseItem);
      setShowSpinner(false);
    }
  };

  return (
    <div className='w-full flex-col flex-1'>
      <div className='flex space-x-2'>
        <button
          onClick={() => setSelectedTab('cases')}
          className={`w-1/2 py-1 rounded-t-lg text-white text-xs ${selectedTab === 'cases' ? 'bg-gray-900' : 'bg-gray-700'}`}
        >
          Кейсы
        </button>
        <button
          onClick={() => setSelectedTab('content')}
          className={`w-1/2 py-1 rounded-t-lg text-white text-xs ${selectedTab === 'content' ? 'bg-gray-900' : 'bg-gray-700'}`}
        >
          Содержимое
        </button>
      </div>

      {selectedTab === 'cases' ? (
        <div className='flex h-full flex-wrap justify-center gap-2 pt-4 bg-gray-900'>
          {loadingCases ? <p className='text-white'>Загрузка кейсов...</p> :
            errorCases || !cases ? <p className='text-red-500'>{errorCases}</p> :
              cases.map((caseItem) => (
                <div key={caseItem.id} className='w-16 h-16 flex items-center justify-center p-0'
                  onClick={() => handleCaseClick(caseItem)}>
                  <Case {...caseItem} />
                </div>
              ))}
        </div>
      ) : (
        <div className='flex h-full flex-wrap justify-center gap-2 pt-4 bg-gray-900'>
          {loadingItems ? <p className='text-white'>Загрузка предметов...</p> :
            errorItems || !items ? <p className='text-red-500'>{errorItems}</p> :
              items.map((item) => (
                <div key={item.id} className='relative w-20 h-20'>
                  <Item {...item} isLoser={false} />
                  <div className='absolute bottom-1 w-full bg-gray-800 text-white text-xs text-center py-1'>
                    <p className='truncate'>{item.weapon_name}</p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default ToggleCasesContent;
