import React, { useState } from 'react';
import P2 from './SegmentBar';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import BarGraphReferral from './BarGraphReferral';
import CustomerAdded from './CustomerAdded';
import CustomerLeft from './CustomerLeft';
import BarGraphBackend from './BarGraphBackend'
import './MainLayout.css'; // Import the CSS file for styling
import LineGraphBackend from './LineGraphBackend';
import ReferralBackend from './ReferralBackend'
import SegmentBar from './SegmentBar';
const ProductAnalytics = () => {
  const [selectedButton, setSelectedButton] = useState('SubFirm');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      

      {/* Two buttons immediately below navbar */}
      <div className="button-container">
        <button
          className={selectedButton === 'SubFirm' ? 'button-selected' : 'button'}
          onClick={() => handleButtonClick('SubFirm')}
        >
          SubFirm
        </button>
        <button
          className={selectedButton === 'ProductCategory' ? 'button-selected' : 'button'}
          onClick={() => handleButtonClick('ProductCategory')}
        >
          ProductCategory
        </button>
      </div>

      {/* Grid layout with components */}
      <div className="flex-container">
        <div className="grid-item">
          <BarGraphBackend selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <LineGraphBackend selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <ReferralBackend selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <CustomerAdded selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <CustomerLeft selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <SegmentBar selectedButton={selectedButton} />
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
