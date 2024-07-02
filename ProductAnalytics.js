import React, { useState } from 'react';
import P2 from './P2';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import BarGraphReferral from './BarGraphReferral';
import CustomerAdded from './CustomerAdded';
import CustomerLeft from './CustomerLeft';
import './MainLayout.css'; // Import the CSS file for styling

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
          <BarGraph selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <LineGraph selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <BarGraphReferral selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <CustomerAdded selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <CustomerLeft selectedButton={selectedButton} />
        </div>
        <div className="grid-item">
          <P2 selectedButton={selectedButton} />
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
