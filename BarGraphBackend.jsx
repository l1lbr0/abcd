import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = () => {
  const [allData, setAllData] = useState([]); // State to store all fetched data
  const [currentData, setCurrentData] = useState({
    labels: [],
    datasets: [],
  });
  const [currentStartYear, setCurrentStartYear] = useState(0); // Track the starting index of the current dataset

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      //   const response = await fetch('http://your-backend/api/years');
      //   const data = await response.json();
      const data = {
        "2000": {
          "advisor": 68,
          "average": 44,
          "highest": 82
        },
        "2001": {
          "advisor": 33,
          "average": 60,
          "highest": 94
        },
        "2002": {
          "advisor": 64,
          "average": 74,
          "highest": 100
        },
        "2003": {
          "advisor": 63,
          "average": 42,
          "highest": 82
        },
        "2004": {
          "advisor": 76,
          "average": 77,
          "highest": 100
        },
        "2005": {
          "advisor": 57,
          "average": 74,
          "highest": 84
        },
        "2006": {
          "advisor": 36,
          "average": 55,
          "highest": 99
        },
        "2007": {
          "advisor": 71,
          "average": 57,
          "highest": 85
        },
        "2008": {
          "advisor": 52,
          "average": 40,
          "highest": 85
        },
        "2009": {
          "advisor": 34,
          "average": 53,
          "highest": 98
        },
        "2010": {
          "advisor": 73,
          "average": 52,
          "highest": 95
        },
        "2011": {
          "advisor": 60,
          "average": 49,
          "highest": 99
        },
        "2012": {
          "advisor": 38,
          "average": 48,
          "highest": 90
        },
        "2013": {
          "advisor": 50,
          "average": 34,
          "highest": 92
        },
        "2014": {
          "advisor": 71,
          "average": 42,
          "highest": 74
        }
      }

      const formattedData = Object.keys(data).map(year => ({
        year,
        advisor: data[year].advisor,
        average: data[year].average,
        highest: data[year].highest,
      }));
      setAllData(formattedData);
      setCurrentStartYear(0); // Initialize the start year index
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to update current data based on start year
  const updateCurrentData = (startYear) => {
    const labels = allData.slice(startYear, startYear + 5).map(item => item.year);
    const advisorData = allData.slice(startYear, startYear + 5).map(item => item.advisor);
    const averageData = allData.slice(startYear, startYear + 5).map(item => item.average);
    const highestData = allData.slice(startYear, startYear + 5).map(item => item.highest);

    setCurrentData({
      labels,
      datasets: [
        {
          label: 'Advisor',
          data: advisorData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Average',
          data: averageData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Highest',
          data: highestData,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update current data when allData or currentStartYear changes
  useEffect(() => {
    if (allData.length > 0) {
      updateCurrentData(currentStartYear);
    }
  }, [allData, currentStartYear]);

  // Function to handle moving to the next 5 years
  const handleNext = () => {
    if (currentStartYear + 5 < allData.length) {
      setCurrentStartYear(currentStartYear + 5);
    }
  };

  // Function to handle moving to the previous 5 years
  const handlePrevious = () => {
    if (currentStartYear > 0) {
      setCurrentStartYear(currentStartYear - 5);
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
              top: 2,
              bottom: 5,
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
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px', // Reduced font size
      }}
      onClick={handlePrevious}
    >
      <div style={{ marginRight: '5px' }}>{'←'}</div>
      <div>Previous 5 Years</div>
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px', // Reduced font size
      }}
      onClick={handleNext}
    >
      <div>Next 5 Years</div>
      <div style={{ marginLeft: '5px' }}>{'→'}</div>
    </div>
  </div>
  );
};

export default BarGraph;
