// Sidebar.jsx

import React, { useState } from 'react';
import { createInitialsAvatar } from './utils';
import './Sidebar.css'; // Import external CSS for sidebar styles

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const customerNames = [
  'John Michael Doe', 'Jane Elizabeth Smith', 'Michael Alan Johnson', 'Chris Matthew Lee', 'Jessica Lynn Brown', 
  'David Andrew Williams', 'Emily Rose Davis', 'Daniel Joseph Miller', 'Emma Grace Wilson', 'James Robert Moore', 
  'Olivia Ann Taylor', 'Liam Christopher Anderson', 'Sophia Marie Thomas', 'Noah Alexander Jackson', 'Ava Nicole White', 
  'Mason William Harris', 'Isabella Faith Martin', 'Lucas Edward Thompson', 'Mia Claire Garcia', 'Ethan James Martinez'
];

const customers = customerNames.map((name, i) => ({
  id: i + 1,
  name,
  state: states[Math.floor(Math.random() * states.length)], // Assign a random state to each customer
  photo: createInitialsAvatar(name),  // Use the initials avatar
}));

const Sidebar = () => {
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const filteredCustomers = selectedState
    ? customers.filter(customer => customer.state === selectedState)
    : customers;

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <label htmlFor="stateFilter">Advisors by State:</label>
        <select id="stateFilter" value={selectedState} onChange={handleStateChange}>
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <ul className="sidebar-list">
        {filteredCustomers.map((customer) => (
          <li key={customer.id} className="sidebar-item">
            <img src={customer.photo} alt="Customer" className="sidebar-item-photo" />
            <div className="sidebar-item-details">
              <p className="sidebar-item-name">{customer.name}</p>
              <p className="sidebar-item-id">ID: {customer.id}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
