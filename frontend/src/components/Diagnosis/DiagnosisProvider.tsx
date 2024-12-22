import React, { useEffect, useState } from 'react';
import { DiagnosisData } from '../../types';
import { useAuth } from '../Auth/AuthContext';
import { DiagnosisContext } from './DiagnosisContext';
import { fetchDiagnosis, createDiagnosis, deleteDiagnosis } from '../../services/diagnosisService';

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadDiagnosis = async () => {
      if (user) {
        const fetchedDiagnosis = await fetchDiagnosis();
        console.log('Fetched diagnosis:', fetchedDiagnosis);
        setDiagnosis(Array.isArray(fetchedDiagnosis) ? fetchedDiagnosis : []);
      } else {
        setDiagnosis([]);
      }
    };
    loadDiagnosis();
  }, [user]);

  const addDiagnosis = async (diagnosis: DiagnosisData) => {
    if (user) {
      const createdDiagnosis = await createDiagnosis(diagnosis);
      setDiagnosis((prevDiagnosis) => Array.isArray(prevDiagnosis) ? [...prevDiagnosis, createdDiagnosis] : [createdDiagnosis]);
    } else {
      throw new Error('User not authenticated');
    }
  };

  const removeDiagnosis = async (id: string) => {
    if (user) {
      await deleteDiagnosis(id);
      setDiagnosis((prevDiagnosis) => prevDiagnosis.filter(diagnosis => diagnosis._id !== id));
    } else {
      throw new Error('User not authenticated');
    }
  };


  return (
    <DiagnosisContext.Provider value={{ diagnosis, addDiagnosis, fetchDiagnosis, removeDiagnosis }}>
      {children}
    </DiagnosisContext.Provider>
  );
};