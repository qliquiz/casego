import { useEffect, useState } from 'react';
import { fetchItemsByCase } from '../services/itemService';
import { ItemProps } from '../types/ItemProps';

export const useItems = (caseId: number | null) => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchItemsByCase(caseId);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки предметов');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [caseId]);

  return { items, loading, error };
};
