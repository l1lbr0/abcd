import React, { useState, useEffect } from 'react';
import axios from 'axios';

const XYZ = ({ id, filter }) => {
  const [subFirm, setSubFirm] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [ids, setIds] = useState([]);
  const [yearlyData, setYearlyData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter === 'subFirm') {
          const response = await axios.get(`/api/subfirm/${id}`);
          if (response && response.data) {
            setSubFirm(response.data);
          }
        } else if (filter === 'productCategory') {
          const response = await axios.get(`/api/productcategory/${id}`);
          if (response && response.data) {
            setProductCategory(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, filter]);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        if (subFirm) {
          const response = await axios.get(`/api/ids`, { params: { value: subFirm, filter: 'subFirm' } });
          if (response && response.data) {
            setIds(response.data);
          }
        } else if (productCategory) {
          const response = await axios.get(`/api/ids`, { params: { value: productCategory, filter: 'productCategory' } });
          if (response && response.data) {
            setIds(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching IDs:', error);
      }
    };

    if (subFirm || productCategory) {
      fetchIds();
    }
  }, [subFirm, productCategory]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const newYearlyData = {};

        for (let year = 2000; year <= 2015; year++) {
          const yearData = {
            idValue: null,
            averageValue: null,
            highestValue: null,
          };

          let total = 0;
          let highest = -Infinity;
          const values = [];

          for (const currentId of ids) {
            const response = await axios.get(`/api/attribute/${currentId}/${year}`);
            if (response && response.data) {
              const value = response.data.value;
              values.push(value);
              total += value;
              if (value > highest) {
                highest = value;
              }
              if (currentId === id) {
                yearData.idValue = value;
              }
            }
          }

          if (values.length > 0) {
            yearData.averageValue = total / values.length;
            yearData.highestValue = highest;
          }

          newYearlyData[year] = yearData;
        }

        setYearlyData(newYearlyData);
      } catch (error) {
        console.error('Error fetching yearly data:', error);
      }
    };

    if (ids.length > 0) {
      fetchYearlyData();
    }
  }, [ids, id]); // Include 'id' in dependencies to re-fetch data when 'id' changes

  return (
    <div>
      <h1>ID: {id}</h1>
      <h2>Filter: {filter}</h2>
      {filter === 'subFirm' && <h3>SubFirm: {subFirm ? JSON.stringify(subFirm) : 'Loading...'}</h3>}
      {filter === 'productCategory' && <h3>ProductCategory: {productCategory ? JSON.stringify(productCategory) : 'Loading...'}</h3>}
      <h3>List of IDs:</h3>
      {ids.length > 0 ? (
        <ul>
          {ids.map((itemId) => (
            <li key={itemId}>{itemId}</li>
          ))}
        </ul>
      ) : (
        <p>No IDs available.</p>
      )}
      <h3>Yearly Data:</h3>
      {Object.keys(yearlyData).length > 0 ? (
        <div>
          {Object.keys(yearlyData).map((year) => (
            <div key={year}>
              <h4>Year {year}</h4>
              <ul>
                <li>ID {id} Value: {yearlyData[year].idValue}</li>
                <li>Average Value: {yearlyData[year].averageValue}</li>
                <li>Highest Value: {yearlyData[year].highestValue}</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading yearly data...</p>
      )}
    </div>
  );
};

export default XYZ;
