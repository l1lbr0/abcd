import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphReferral = () => {
  // Initial data for 5 years (can be replaced with your actual data)
  const initialData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Referrals',
        data: [50, 80, 70, 60, 90], // Replace with your actual data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [currentData, setCurrentData] = useState(initialData);
  const [currentStartYear, setCurrentStartYear] = useState(1); // Track the starting year of current dataset

  // Function to handle moving to the next 5 years
  const handleNext = () => {
    if(currentStartYear+6<10){
    // Replace with logic to fetch next 5 years data
    // For demonstration, just updating labels and data
    setCurrentData(prevData => ({
      labels: ['Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
      datasets: [
        {
          ...initialData.datasets[0],
          data: [100, 140, 90, 130, 120], // Replace with next 5 years data
        },
      ],
    }));
    setCurrentStartYear(currentStartYear + 5); // Update starting year
}
  };

  // Function to handle moving to the previous 5 years
  const handlePrevious = () => {
    // Ensure not to go back beyond Year 1
    if (currentStartYear > 1) {
      setCurrentData(prevData => ({
        labels: [
          `Year ${currentStartYear - 5}`,
          `Year ${currentStartYear - 4}`,
          `Year ${currentStartYear - 3}`,
          `Year ${currentStartYear - 2}`,
          `Year ${currentStartYear - 1}`,
        ],
        datasets: [
          {
            ...initialData.datasets[0],
            data: [50, 80, 70, 60, 90], // Replace with previous 5 years data
          },
        ],
      }));
      setCurrentStartYear(currentStartYear - 5); // Update starting year
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Bar
        data={currentData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
        display: true,
        text: 'Referrals Yearly Analysis',
        padding: {
        top: 2, // Adjust the top padding as needed
        bottom: 5, // Optional: Adjust bottom padding if necessary
      },
      },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'No. of Referrals',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Years',
              },
            },
          },
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          cursor: 'pointer',
        }}
        onClick={handlePrevious}
      >
        {'←'}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
        onClick={handleNext}
      >
        {'→'}
      </div>
    </div>
  );
};

export default BarGraphReferral;
