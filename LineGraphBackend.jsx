import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const LineGraph = () => {
  const [currentData, setCurrentData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedYear, setSelectedYear] = useState(2021);
  const [showNext, setShowNext] = useState(false);
  const [selectedButton, setSelectedButton] = useState('SubFirm');

  // Function to fetch data from the backend
  const fetchData = async (year, button) => {
    try {
      // const response = await fetch(`http://your-backend/api/data?year=${year}&button=${button}`);
      // const data = await response.json();
      const data = {
        "1": { "advisor": 12, "average": 14, "highest": 19 },
        "2": { "advisor": 15, "average": 17, "highest": 22 },
        "3": { "advisor": 20, "average": 24, "highest": 29 },
        "4": { "advisor": 18, "average": 22, "highest": 27 },
        "5": { "advisor": 25, "average": 28, "highest": 32 },
        "6": { "advisor": 30, "average": 33, "highest": 37 },
        "7": { "advisor": 28, "average": 31, "highest": 35 },
        "8": { "advisor": 33, "average": 36, "highest": 40 },
        "9": { "advisor": 35, "average": 38, "highest": 42 },
        "10": { "advisor": 40, "average": 43, "highest": 45 },
        "11": { "advisor": 38, "average": 41, "highest": 44 },
        "12": { "advisor": 45, "average": 47, "highest": 50 }
      };

      const labels = Object.keys(data).map(month => {
        switch (month) {
          case "1": return "January";
          case "2": return "February";
          case "3": return "March";
          case "4": return "April";
          case "5": return "May";
          case "6": return "June";
          case "7": return "July";
          case "8": return "August";
          case "9": return "September";
          case "10": return "October";
          case "11": return "November";
          case "12": return "December";
          default: return "";
        }
      });

      const advisorData = Object.values(data).map(item => item.advisor);
      const averageData = Object.values(data).map(item => item.average);
      const highestData = Object.values(data).map(item => item.highest);

      // Set data for the first 6 months or the last 6 months based on showNext
      const startIndex = showNext ? 6 : 0;
      const endIndex = showNext ? 12 : 6;

      setCurrentData({
        labels: labels.slice(startIndex, endIndex),
        datasets: [
          {
            label: 'Advisor',
            data: advisorData.slice(startIndex, endIndex),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
          {
            label: 'Average',
            data: averageData.slice(startIndex, endIndex),
            borderColor: 'rgba(153,102,255,1)',
            backgroundColor: 'rgba(153,102,255,0.2)',
            fill: true,
          },
          {
            label: 'Highest',
            data: highestData.slice(startIndex, endIndex),
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts or selectedYear/selectedButton/showNext changes
  useEffect(() => {
    fetchData(selectedYear, selectedButton);
  }, [selectedYear, selectedButton, showNext]);

  // Function to handle year change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Function to toggle between SubFirm and ProductCategory
  const toggleData = () => {
    setShowNext(!showNext);
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
    bottom: '0px', // Adjusted to shift the arrow down
    right: showNext ? 'auto' : '10px',
    left: showNext ? '10px' : 'auto',
    zIndex: 1,
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }}
>
  <div onClick={toggleData} style={{ fontSize: '20px', color: 'black' }}>
    {showNext ? '←' : '→'}
  </div>
  <div onClick={toggleData} style={{ fontSize: '12px', color: 'black', marginLeft: '8px' }}>
    {showNext ? 'Previous 6' : 'Next 6'}
  </div>
</div>

    </div>
  );
};

export default LineGraph;
