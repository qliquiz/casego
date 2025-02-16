import { apiClient } from './apiClient';
import { ItemProps } from '../types/ItemProps';
import environment from '../../configs/environment';

export const fetchInventory = async (userId: string): Promise<ItemProps[]> => {
  return apiClient<ItemProps[]>(`${environment.apiUrl}/inventory/${userId}`);
};
