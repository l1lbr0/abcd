// ProductAnalytics.jsx
import React from 'react';
import P2 from './P2';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import BarGraphReferral from './BarGraphReferral';
import './Dashboard.css'; // Import the CSS file for styling
import AdvisorProductsChart from './AdvisorProductsChart';
import Bar1 from './Bar1'

const Dashboard = () => {
  return (
    <div className="main-container-1">
      
      <div className="flex-container-1">
        <div className="grid-item-1">
          <Bar1/>
        </div>
        <div className="grid-item-1">
          <LineGraph />
        </div>
        <div className="grid-item-1">
          <BarGraphReferral />
        </div>
        <div className="grid-item-1">
          <P2 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
