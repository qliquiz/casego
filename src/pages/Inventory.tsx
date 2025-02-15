import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item, { ItemProps } from '../components/ui/Item';

const Inventory = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/inventory/${id}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData: ItemProps[] = data.data ? JSON.parse(data.data) : [];

        if (Array.isArray(parsedData)) {
          setItems(parsedData);
        } else {
          throw new Error('Ошибка данных: ожидается массив');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [id]);

  if (loading) return <p className='text-center pt-4 text-white'>Загрузка инвентаря...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;
  if (!items.length) return <p className='text-center text-gray-400'>Инвентарь пока пуст</p>;

  return (
    <div className='flex flex-col items-center p-4 text-white'>
      <h1 className='text-2xl font-bold mb-4'>Инвентарь</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            weapon_name={item.weapon_name}
            skin_name={item.skin_name}
            rarity={item.rarity}
            steam_image={item.steam_image}
            isLoser={item.isLoser}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
