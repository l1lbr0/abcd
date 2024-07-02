import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const LineGraph = () => {
  const initialData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Advisor',
        data: [8, 14, 20, 45, 22, 26],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Average',
        data: [10, 15, 25, 35, 28, 30],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
      {
        label: 'Highest',
        data: [15, 25, 35, 55, 35, 40],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  const nextData = {
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Advisor',
        data: [30, 35, 28, 42, 38, 45],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Average',
        data: [32, 30, 33, 40, 37, 43],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
      {
        label: 'Highest',
        data: [40, 45, 42, 50, 48, 52],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  const [currentData, setCurrentData] = useState(initialData);
  const [showNext, setShowNext] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2021);

  const toggleData = () => {
    if (showNext) {
      setCurrentData(initialData);
    } else {
      setCurrentData(nextData);
    }
    setShowNext(!showNext);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentData(yearwiseData[year]);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AUM Monthly Analysis',
        padding: {
          top: 2, // Adjust the top padding as needed
          bottom: 5, // Optional: Adjust bottom padding if necessary
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'AUM (Million $)',
        },
        beginAtZero: true,
      },
    },
  };

  // Mock data for three years
  const yearwiseData = {
    2021: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Advisor',
          data: [8, 14, 20, 45, 22, 26],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
        {
          label: 'Average',
          data: [10, 15, 25, 35, 28, 30],
          borderColor: 'rgba(153,102,255,1)',
          backgroundColor: 'rgba(153,102,255,0.2)',
          fill: true,
        },
        {
          label: 'Highest',
          data: [15, 25, 35, 55, 35, 40],
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
        },
      ],
    },
    2022: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Advisor',
          data: [12, 18, 24, 50, 30, 35],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
        {
          label: 'Average',
          data: [15, 20, 30, 40, 35, 40],
          borderColor: 'rgba(153,102,255,1)',
          backgroundColor: 'rgba(153,102,255,0.2)',
          fill: true,
        },
        {
          label: 'Highest',
          data: [20, 30, 40, 60, 45, 50],
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
        },
      ],
    },
    2023: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Advisor',
          data: [15, 25, 35, 60, 40, 50],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
        {
          label: 'Average',
          data: [18, 26, 38, 45, 42, 48],
          borderColor: 'rgba(153,102,255,1)',
          backgroundColor: 'rgba(153,102,255,0.2)',
          fill: true,
        },
        {
          label: 'Highest',
          data: [25, 35, 45, 65, 50, 55],
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
        },
      ],
    },
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <select onChange={(e) => handleYearChange(parseInt(e.target.value))} value={selectedYear}>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </div>
      <Line data={currentData} options={options} />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: showNext ? 'auto' : '10px',
          left: showNext ? '10px' : 'auto',
          zIndex: 1,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: '12px', color: 'black', marginBottom: '2px' }}>
          
        </div>
        <div onClick={toggleData} style={{ fontSize: '20px', color: 'black' }}>
          {showNext ? '←' : '→'}
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
