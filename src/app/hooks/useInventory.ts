import { useEffect, useState } from 'react';
import { fetchInventory } from '../services/inventoryService';
import { ItemProps } from '../types/ItemProps';

export const useInventory = (userId: string | undefined) => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const loadInventory = async () => {
      try {
        const data = await fetchInventory(userId);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки инвентаря');
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [userId]);

  return { items, loading, error };
};
