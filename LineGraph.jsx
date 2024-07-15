import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const data = {
  1: { advisor: 68, average: 44, highest: 82 },
  2: { advisor: 33, average: 60, highest: 94 },
  3: { advisor: 64, average: 74, highest: 100 },
  4: { advisor: 63, average: 42, highest: 82 },
  5: { advisor: 76, average: 77, highest: 100 },
  6: { advisor: 57, average: 74, highest: 84 },
  7: { advisor: 36, average: 55, highest: 99 },
  8: { advisor: 71, average: 57, highest: 85 },
  9: { advisor: 52, average: 40, highest: 85 },
  10: { advisor: 34, average: 53, highest: 98 },
  11: { advisor: 73, average: 52, highest: 95 },
  12: { advisor: 60, average: 49, highest: 99 },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
`;

const ArrowButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;

const LineGraph = () => {
  const [monthsToShow, setMonthsToShow] = useState(3);

  const handleRightClick = () => {
    setMonthsToShow((prev) => (prev === 3 ? 6 : prev === 6 ? 9 : prev === 9 ? 12 : 12));
  };

  const handleLeftClick = () => {
    setMonthsToShow((prev) => (prev === 12 ? 9 : prev === 9 ? 6 : prev === 6 ? 3 : 3));
  };

  const filteredData = Object.entries(data)
    .slice(0, monthsToShow)
    .map(([month, values]) => ({ month, ...values }));

  const chartData = {
    labels: filteredData.map((item) => {
      // Convert numeric month to name
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return monthNames[item.month - 1]; // Adjust index for array
    }),
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
