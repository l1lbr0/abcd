import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fetchAdvisorAmounts = async () => {
  const response = await fetch('/api/advisorAmounts');
  const data = await response.json();
  return data;
};

const processSegmentData = (data) => {
  const advisorAmounts = Object.values(data);
  const maxAUM = Math.max(...advisorAmounts);
  const segmentSize = maxAUM / 10;
  const segments = Array(10).fill(0);

  advisorAmounts.forEach(aum => {
    const segmentIndex = Math.min(Math.floor(aum / segmentSize), 9); // Ensures the highest value falls into the last segment
    segments[segmentIndex]++;
  });

  const labels = Array.from({ length: 10 }, (_, i) => {
    const start = (i * segmentSize).toFixed(2);
    const end = ((i + 1) * segmentSize).toFixed(2);
    return `${start}-${end}`;
  });

  return { segments, labels };
};

const AdvisorBarGraph = () => {
  const [segmentData, setSegmentData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const advisorData = await fetchAdvisorAmounts();
      const { segments, labels } = processSegmentData(advisorData);
      setSegmentData(segments);
      setLabels(labels);
    };

    getData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Advisors',
        data: segmentData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Advisors by AUM Segments (in Million $)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'AUM Segments (in Million $)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Advisors',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AdvisorBarGraph;
