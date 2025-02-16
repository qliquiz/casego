import { apiClient } from './apiClient';
import { ItemProps } from '../types/ItemProps';
import environment from '../../configs/environment';

export const fetchInventory = async (userId: string): Promise<ItemProps[]> => {
  return apiClient<ItemProps[]>(`${environment.apiUrl}/inventory/${userId}`);
};

export const addItemToInventory = async (userId: number , itemId: number) => {
  return apiClient<{ success: boolean }>(`${environment.apiUrl}/open`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
      item_id: itemId,
    }),
  });
};
