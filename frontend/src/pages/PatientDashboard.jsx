// frontend/src/pages/PatientDashboard.jsx
import React, { useState } from 'react';
import api from '../services/api';

const PatientDashboard = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/patient/search?name=${query}`);
      setResults(res.data);
    } catch (err) {
      alert('Search failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Patient Dashboard</h2>
      <div className="mb-4">
        <input placeholder="Medicine name" onChange={e => setQuery(e.target.value)} className="border p-1 mr-2"/>
        <button onClick={handleSearch} className="bg-green-500 text-white px-3">Search</button>
      </div>
      <ul>
        {results.map(r => (
          <li key={r._id} className="mb-2">
            {r.name} - ${r.price} - Vendor: {r.vendor.name} ({r.vendor.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
