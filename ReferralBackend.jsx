import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

// Example data
const referralData = {
  "2000": 21,
  "2001": 32,
  "2002": 14,
  "2003": 45,
  "2004": 33,
  "2005": 27,
  "2006": 39,
  "2007": 29,
  "2008": 50,
  "2009": 24,
  "2010": 37,
  "2011": 43,
  "2012": 18,
  "2013": 52,
  "2014": 31
};

const BarGraphReferral = ({ selectedButton }) => {
  const initialData = {
    labels: [],
    datasets: [
      {
        label: 'Referrals',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ],
  };

  const [currentData, setCurrentData] = useState(initialData);
  const [currentStartYear, setCurrentStartYear] = useState(2000);

  const fetchData = (startYear, button) => {
    const labels = [];
    const data = [];

    for (let year = startYear; year < startYear + 5; year++) {
      labels.push(year.toString());
      data.push(referralData[year]);
    }

    setCurrentData({
      labels,
      datasets: [
        {
          label: 'Referrals',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    fetchData(currentStartYear, selectedButton);
  }, [currentStartYear, selectedButton]);

  const handleNext = () => {
    if (currentStartYear + 5 <= 2010) {
      setCurrentStartYear(currentStartYear + 5);
    }
  };

  const handlePrevious = () => {
    if (currentStartYear - 5 >= 2000) {
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
              text: 'Referrals Yearly Analysis',
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
        bottom: '0px',
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
        bottom: '0px',
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

export default BarGraphReferral;
