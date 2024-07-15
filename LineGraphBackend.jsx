import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

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
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const ArrowButton = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const LineGraph = () => {
  const [yearsToShow, setYearsToShow] = useState(5);

  const handleRightClick = () => {
    setYearsToShow((prev) => (prev === 5 ? 10 : prev === 10 ? 15 : 15));
  };

  const handleLeftClick = () => {
    setYearsToShow((prev) => (prev === 15 ? 10 : prev === 10 ? 5 : 5));
  };

  const filteredData = Object.entries(data)
    .slice(0, yearsToShow)
    .map(([year, values]) => ({ year, ...values }));

  const chartData = {
    labels: filteredData.map((item) => item.year),
    datasets: [
      {
        label: 'Advisor',
        data: filteredData.map((item) => item.advisor),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Average',
        data: filteredData.map((item) => item.average),
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: 'Highest',
        data: filteredData.map((item) => item.highest),
        fill: false,
        backgroundColor: 'rgba(255,159,64,0.4)',
        borderColor: 'rgba(255,159,64,1)',
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <Line
        data={chartData}
        options= {{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'AUM YEARLY ANALYSIS',
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
                                text: 'AUM (MM$)',
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
        onClick={handleLeftClick}
    >
        <div style={{ marginRight: '5px' }}>{'←'}</div>
        
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
        onClick={handleRightClick}
    >
        
        <div style={{ marginLeft: '5px' }}>{'→'}</div>
    </div>

   
</div>
  );
};

export default LineGraph;
