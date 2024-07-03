import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createInitialsAvatar } from './utils';

//Expected format
// [
//     {
//       "id": 1,
//       "name": "John Michael Doe"
//     },
//     {
//       "id": 2,
//       "name": "Jane Elizabeth Smith"
//     },
//     {
//       "id": 3,
//       "name": "Michael Alan Johnson"
//     },
//     ...
//   ]
const states = [
    { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' }, { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' }, { name: 'California', code: 'CA' }, { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' }, { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' }, { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' }, { name: 'Iowa', code: 'IA' },
    { name: 'Kansas', code: 'KS' }, { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' }, { name: 'Massachusetts', code: 'MA' },
    { name: 'Michigan', code: 'MI' }, { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' }, { name: 'Montana', code: 'MT' }, { name: 'Nebraska', code: 'NE' },
    { name: 'Nevada', code: 'NV' }, { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' }, { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' }, { name: 'Ohio', code: 'OH' }, { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' }, { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' }, { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' }, { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' }, { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' }
  ];

const Sidebar = () => {
  const [selectedState, setSelectedState] = useState('AL'); // Default to Alabama

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers(selectedState);
  }, [selectedState]);

  const fetchCustomers = async (stateCode) => {
    try {
      const response = await axios.get(`your-backend-api/customers?state=${stateCode}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div style={{ width: '250px', overflowY: 'scroll', height: 'calc(100vh - 45px)', borderRight: '1px solid #dee2e6', backgroundColor: '#F0EBE3' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
        <label htmlFor="stateFilter">Advisors by State:</label>
        <select id="stateFilter" value={selectedState} onChange={handleStateChange} style={{ width: '100%', marginTop: '5px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}>
          {states.map((state) => (
            <option key={state.code} value={state.code}>{state.name}</option>
          ))}
        </select>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {customers.map((customer) => (
          <li key={customer.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #dee2e6' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img src={createInitialsAvatar(customer.name)} alt="Customer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{customer.name}</p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>ID: {customer.id}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
