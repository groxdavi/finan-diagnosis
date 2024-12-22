import React from 'react';
import { DiagnosisData } from '../../types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import './DiagnosisItem.css';
import { useDiagnosis } from './DiagnosisContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DiagnosisItemProps {
  diagnosis: DiagnosisData;
}

const DiagnosisItem: React.FC<DiagnosisItemProps> = ({ diagnosis }) => {
  const { removeDiagnosis } = useDiagnosis();

  const savings = diagnosis.income - diagnosis.expenses;
  const savingsRate = (savings / diagnosis.income) * 100;

  // Lógica de colores para los segmentos
  const incomeColor = diagnosis.income > diagnosis.expenses ? 'green' : 'gray';
  const expensesColor = diagnosis.expenses > diagnosis.income ? 'black' : 'gray';
  const savingsColor = savingsRate > 20 ? 'blue' : 'yellow';

  // Datos del gráfico Doughnut
  const chartData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [diagnosis.income, diagnosis.expenses, savings],
        backgroundColor: [incomeColor, expensesColor, savingsColor],
        borderColor: ['green', 'black', 'orange'],
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico Doughnut
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Financial Overview',
        font: {
          size: 20,
          weight: 700,
        },
        color: '#fff',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'doughnut'>) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: $${(value as number).toFixed(2)}`;
          },
        },
      },
    },
  };

  const handleDeleteClick = async () => {
    await removeDiagnosis(diagnosis._id);
  };

  return (
    <div className="diagnosis-item">
      <div className="diagnosis-info">
        <div className="diagnosis-text">
          <p><strong>Income:</strong> ${diagnosis.income}</p>
          <p><strong>Expenses:</strong> ${diagnosis.expenses}</p>
          <p><strong>Savings:</strong> ${savings}</p>
          <div className="recommendations">
            <p><strong>Recommendations:</strong></p>
            <p>{diagnosis.recommendations}</p>
          </div>
        </div>
        <div className="chart-container">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
      <button onClick={handleDeleteClick}>Borrar</button>
    </div>
  );
};

export default DiagnosisItem;

