import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function NEOChart({ neoData }) {
  const chartData = {
    labels: neoData.map(neo => neo.name),
    datasets: [
      {
        label: 'Miss Distance (km)',
        data: neoData.map(neo => parseFloat(neo.missDistance)),
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Change bar color to black with some transparency
        borderColor: 'rgba(0, 0, 0, 1)', // Change border color to black
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Near Earth Objects - Miss Distance',
        color: 'black',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default NEOChart;
