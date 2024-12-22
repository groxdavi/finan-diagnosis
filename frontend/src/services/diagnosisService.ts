import { apiClient } from "../utils/api";
import { DiagnosisData } from '../types';

const API_URL = '/api/diagnosis';

export const fetchDiagnosis = async (): Promise<DiagnosisData[]> => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch {
    throw new Error('Failed to fetch diagnosis');
  }
};

export const createDiagnosis = async (diagnosi: DiagnosisData): Promise<DiagnosisData> => {
  try {
    const response = await apiClient.post(`${API_URL}/createDiagnostic`, diagnosi, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch {
    throw new Error('Failed to create diagnosis');
  }
};

export const deleteDiagnosis = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`${API_URL}/${id}`);
  } catch {
    throw new Error('Failed to delete task');
  }
};
