// Popup.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Popup.css';

const Popup = ({ state, onClose }) => {
  const [advisors, setAdvisors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(`/api/advisors`, { params: { state } });
        const advisorsData = response.data;

        const advisorsWithDetails = await Promise.all(
          advisorsData.map(async (advisor) => {
            const detailsResponse = await axios.get(`/api/advisorDetails`, { params: { id: advisor.id } });
            const details = detailsResponse.data;
            return {
              ...advisor,
              customers: details.customers,
              products: details.products,
            };
          })
        );

        setAdvisors(advisorsWithDetails);
      } catch (error) {
        console.error('Error fetching advisors:', error);
      }
    };

    fetchAdvisors();
  }, [state]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = advisors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(advisors.length / itemsPerPage);

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
        <div className="popup-header">
          <h2>Details</h2>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
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
      </div>
    </div>
  );
};

export default Popup;
