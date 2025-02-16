import environment from '../../configs/environment';
import { User } from '../types/User';
import { apiClient } from './apiClient';

export const createUser = async (userDto: User) => {
  return apiClient<{ success: boolean }>(`${environment.apiUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userDto),
  });
};
