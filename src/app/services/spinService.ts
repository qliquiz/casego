import { apiClient } from './apiClient';
import environment from '../../configs/environment';
import { ItemProps } from '../types/ItemProps';

export const getWeaponsByCase = async (caseId: number): Promise<ItemProps[]> => {
  return apiClient<ItemProps[]>(`${environment.apiUrl}/cases/weapons/${caseId}`);
};
