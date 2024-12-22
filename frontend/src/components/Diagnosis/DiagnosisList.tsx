import React, { useState, useEffect } from 'react';
import { useDiagnosis } from './DiagnosisContext';
import DiagnosisItem from './DiagnosisItem';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./DiagnosisList.css"

const DiagnosisList: React.FC = () => {
  const { diagnosis, fetchDiagnosis, addDiagnosis } = useDiagnosis();
  const { user } = useAuth();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchDiagnosis();
    }
  }, [user, fetchDiagnosis]);

  const handleAddDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add diagnosis");
      navigate("/login");
      return;
    }
    if (income && expenses) {
      await addDiagnosis({ _id: Date.now().toString(), income: parseFloat(income), expenses: parseFloat(expenses), recommendations: '', userId: user.id });
      setIncome('');
      setExpenses('');
    }
  };

  return (
    <div className="diagnosis-list">
      <h2 style={{ color: 'white' }}>Diagnóstico</h2>
      <form onSubmit={handleAddDiagnosis}>
        <div>
          <label>Ingresos:</label>
          <input
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gastos:</label>
          <input
            type="text"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
        </div>
        <button type="submit">Analizar</button>
      </form>
      <ul>
        {Array.isArray(diagnosis) && diagnosis.map(diagnosis => (
          <DiagnosisItem key={diagnosis._id} diagnosis={diagnosis} />
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisList;
