import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaInfoCircle } from 'react-icons/fa';
import './SegmentBar.css'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const data = {
    labels: ['Platinum', 'Gold', 'Silver', 'Bronze'],
    datasets: [
      {
        label: 'Advisor',
        backgroundColor: 'rgba(229, 228, 226, 0.8)', // Platinum color
        borderColor: 'rgba(229, 228, 226, 1)',
        borderWidth: 1,
        data: [30, 45, 35, 25],
      },
      {
        label: 'Average',
        backgroundColor: 'rgba(255, 215, 0, 0.8)', // Gold color
        borderColor: 'rgba(255, 215, 0, 1)',
        borderWidth: 1,
        data: [25, 40, 30, 20],
      },
      {
        label: 'Highest',
        backgroundColor: 'rgba(192, 192, 192, 0.8)', // Silver color
        borderColor: 'rgba(192, 192, 192, 1)',
        borderWidth: 1,
        data: [35, 50, 40, 30],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Customer Segment Distribution',
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Segments',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Customers',
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Bar data={data} options={options} />
      <div
        className="info-icon"
        onClick={toggleTooltip}
        style={{ position: 'absolute', top: 1, right: 1, cursor: 'pointer' }}
      >
        <FaInfoCircle />
      </div>
      {tooltipOpen && (
        <div className="tooltip" style={{ position: 'absolute', top: 35, right: 10 }}>
          This chart shows the distribution of customers across different segments.
        </div>
      )}
    </div>
  );
};

export default BarGraph;
