import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = () => {
  // Initial data for 5 years (can be replaced with your actual data)
  const initialData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Advisor',
        data: [60, 55, 45, 60, 50], // Example data for Advisor (vary as needed)
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Average',
        data: [50, 65, 35, 58, 65], // Example data for Average (vary as needed)
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Highest',
        data: [70, 75, 65, 80, 75], // Example data for Highest (vary as needed)
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
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
    // For demonstration, just updating data
    setCurrentData(prevData => ({
      labels: ['Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [55, 50, 65, 58, 62], // Example next 5 years data for Advisor
        },
        {
          ...prevData.datasets[1],
          data: [65, 70, 58, 72, 68], // Example next 5 years data for Average
        },
        {
          ...prevData.datasets[2],
          data: [75, 80, 70, 85, 78], // Example next 5 years data for Highest
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
            ...prevData.datasets[0],
            data: [60, 55, 45, 60, 50], // Example previous 5 years data for Advisor
          },
          {
            ...prevData.datasets[1],
            data: [50, 65, 35, 58, 65], // Example previous 5 years data for Average
          },
          {
            ...prevData.datasets[2],
            data: [70, 75, 65, 80, 75], // Example previous 5 years data for Highest
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
        text: 'AUM Yearly Analysis',
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
                text: 'AUM (Million $)',
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

export default BarGraph;
