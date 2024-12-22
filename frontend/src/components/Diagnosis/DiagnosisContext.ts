import { createContext, useContext } from 'react';
import { DiagnosisData } from '../../types';

interface DiagnosisContextType {
  diagnosis: DiagnosisData[];
  addDiagnosis: (diagnosis: DiagnosisData) => Promise<void>;
  fetchDiagnosis: () => void;
  removeDiagnosis: (id: string) => Promise<void>;
}

export const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (context === undefined) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
};