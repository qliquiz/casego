import { apiClient } from './apiClient';
import { ItemProps } from '../types/ItemProps';
import environment from '../../configs/environment';

export const getItemsByCase = async (caseId: number): Promise<ItemProps[]> => {
  return apiClient<ItemProps[]>(`${environment.apiUrl}/cases/weapons/${caseId}`);
};
