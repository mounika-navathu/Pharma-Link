// frontend/src/pages/PatientRegister.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const PatientRegister = () => {
  const [formData, setFormData] = useState({ name:'', email:'', password:'' });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {...formData, role: 'patient'});
      alert('Registered successfully. Please login.');
      history.push('/patient/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Patient Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 mb-2 block w-full" required />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="border p-1 mb-2 block w-full" required />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} className="border p-1 mb-2 block w-full" required />
        <button type="submit" className="bg-green-500 text-white px-3 py-1">Register</button>
      </form>
    </div>
  );
};

export default PatientRegister;
