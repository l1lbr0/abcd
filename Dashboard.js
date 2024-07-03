import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar component is correctly implemented

import './Dashboard.css'; // Import external CSS for dashboard styles
import AdvisorProductsChart from './AdvisorProductsChart';
import LineGraph from './LineGraph';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="grid-item">
          <AdvisorProductsChart />
        </div>
        <div className="grid-item">
          <LineGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
