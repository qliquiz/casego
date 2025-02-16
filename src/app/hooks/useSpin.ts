import { useEffect, useState } from 'react';
import { ItemProps } from '../types/ItemProps';
import { getItemsByCase } from '../services/itemService';

export const useSpin = (caseId: number | null) => {
  const [weapons, setWeapons] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const loadWeapons = async () => {
      try {
        setLoading(true);
        const data = await getItemsByCase(caseId);
        setWeapons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки оружия');
      } finally {
        setLoading(false);
      }
    };

    loadWeapons();
  }, [caseId]);

  return { weapons, loading, error };
};
