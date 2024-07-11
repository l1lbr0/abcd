import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  const mockData = [
    { name: 'Product 1', id: '001', customers: 50, products: 20 },
    { name: 'Product 2', id: '002', customers: 30, products: 15 },
    { name: 'Product 3', id: '003', customers: 70, products: 25 },
    { name: 'Product 4', id: '004', customers: 40, products: 18 },
    { name: 'Product 5', id: '005', customers: 60, products: 22 },
    { name: 'Product 6', id: '006', customers: 80, products: 30 },
    { name: 'Product 7', id: '007', customers: 90, products: 35 },
    { name: 'Product 8', id: '008', customers: 20, products: 10 },
    { name: 'Product 9', id: '009', customers: 55, products: 28 },
    { name: 'Product 10', id: '010', customers: 35, products: 14 },
    { name: 'Product 11', id: '011', customers: 65, products: 32 },
    { name: 'Product 12', id: '012', customers: 25, products: 12 },
    { name: 'Product 13', id: '013', customers: 75, products: 38 },
    { name: 'Product 14', id: '014', customers: 85, products: 40 },
    { name: 'Product 15', id: '015', customers: 95, products: 50 }
  ];

  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="popup-header">
          <h2>Details</h2>
          {loading && <div className="spinner"></div>}
        </div>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>No. of Customers</th>
                  <th>No. of Products</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.customers}</td>
                    <td>{item.products}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
