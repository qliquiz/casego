import { useParams } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import Item from '../components/ui/Item';

const Inventory = () => {
  const { id } = useParams<{ id: string }>();
  const { items, loading, error } = useInventory(id);

  if (loading) return <p className="text-center pt-4 text-white">Загрузка инвентаря...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!items.length) return <p className="text-center text-gray-400">Инвентарь пока пуст</p>;

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Инвентарь</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
