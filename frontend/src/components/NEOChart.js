// NEOChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components you will use
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NEOChart = ({ neoData }) => {
  const chartData = {
    labels: neoData.map((neo) => neo.name),
    datasets: [
      {
        label: 'Estimated Diameter (meters)',
        data: neoData.map((neo) => neo.estimated_diameter.meters.estimated_diameter_max), // Use the appropriate value for diameter
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Diameter (meters)',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default NEOChart;
