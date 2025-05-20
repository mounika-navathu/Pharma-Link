// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    try {
      const vendRes = await api.get('/admin/vendors');
      const statRes = await api.get('/admin/stats');
      setVendors(vendRes.data);
      setStats(statRes.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => { fetchData(); }, []);

  const approve = async (id) => {
    try {
      await api.patch(`/admin/vendors/${id}/approve`);
      fetchData();
    } catch (err) {
      alert('Approve failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Admin Dashboard</h2>
      <div className="mb-4">
        <p>Total Vendors: {stats.totalVendors}</p>
        <p>Approved Vendors: {stats.approvedVendors}</p>
        <p>Total Patients: {stats.totalPatients}</p>
      </div>
      <h3 className="text-lg">Vendors List</h3>
      <ul>
        {vendors.map(v => (
          <li key={v._id} className="mb-2 flex justify-between items-center">
            {v.name} ({v.email}) - Approved: {v.isApproved ? 'Yes' : 'No'}
            {!v.isApproved && (
              <button onClick={() => approve(v._id)} className="bg-blue-500 text-white px-2 py-1">Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
