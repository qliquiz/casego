import { useEffect, useState } from 'react';
import { getCases } from '../services/caseService';
import { CaseProps } from '../types/CaseProps';

export const useCases = () => {
  const [cases, setCases] = useState<CaseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки кейсов');
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  return { cases, loading, error };
};
