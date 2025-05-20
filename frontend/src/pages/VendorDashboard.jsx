// frontend/src/pages/VendorDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const VendorDashboard = () => {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({ name:'', price:'', stock:'' });

  const fetchMeds = async () => {
    try {
      const res = await api.get('/vendor/medicines');
      setMeds(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => { fetchMeds(); }, []);

  const handleAdd = async () => {
    try {
      const res = await api.post('/vendor/medicines', form);
      setMeds([...meds, res.data]);
    } catch (err) {
      alert('Add failed');
    }
  };

  const handleUpdate = async (id) => {
    const newName = prompt('New name:');
    const newPrice = prompt('New price:');
    const newStock = prompt('New stock:');
    try {
      await api.put(`/vendor/medicines/${id}`, { name: newName, price: newPrice, stock: newStock });
      fetchMeds();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this medicine?')) return;
    try {
      await api.delete(`/vendor/medicines/${id}`);
      fetchMeds();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Vendor Dashboard</h2>
      <div className="mb-4">
        <input placeholder="Medicine Name" onChange={e => setForm({...form, name: e.target.value})} className="border p-1 mr-2"/>
        <input placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} className="border p-1 mr-2"/>
        <input placeholder="Stock" onChange={e => setForm({...form, stock: e.target.value})} className="border p-1 mr-2"/>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3">Add</button>
      </div>
      <ul>
        {meds.map(m => (
          <li key={m._id} className="mb-2 flex justify-between items-center">
            {m.name} - ${m.price} - Stock: {m.stock}
            <div>
              <button onClick={() => handleUpdate(m._id)} className="text-blue-700 mr-2">Edit</button>
              <button onClick={() => handleDelete(m._id)} className="text-red-700">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorDashboard;
