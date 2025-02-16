import { apiClient } from './apiClient';
import { CaseProps } from '../types/CaseProps';
import environment from '../../configs/environment';

export const getCases = async (): Promise<CaseProps[]> => {
  return apiClient<CaseProps[]>(`${environment.apiUrl}/cases/cases`);
};
