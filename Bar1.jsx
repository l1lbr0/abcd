import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Bar1.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar1 = () => {
  const data = {
    labels: [
      '0-100', '100-200', '200-300', '300-400', '400-500', '500-600',
      '600-700', '700-800', '800-900', '900-1000', '1000-1100', 
      '1100-1200', '1200-1300', '1300-1400'
    ],
    datasets: [
      {
        label: 'Number of Advisors',
        data: [12, 19, 3, 5, 2, 3, 10, 15, 7, 8, 6, 11, 9, 4], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Make the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Advisors by AUM Segments',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Advisors',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'AUM Segments (in Million $)', // Adding the label with "in Million $"
        },
      },
    },
  };

  return (
    <div className="bar-container">
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Bar1;
