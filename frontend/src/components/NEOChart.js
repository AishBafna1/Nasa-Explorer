import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function NEOChart({ neoData }) {
  const chartData = {
    labels: neoData.map(neo => neo.name), // Labels are NEO names
    datasets: [
      {
        label: 'Miss Distance (km)',
        data: neoData.map(neo => parseFloat(neo.close_approach_data[0].miss_distance.kilometers)),
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Bar color
        borderColor: 'rgba(0, 0, 0, 1)', // Border color
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
  };

  return <Bar data={chartData} options={options} />;
}

export default NEOChart;

