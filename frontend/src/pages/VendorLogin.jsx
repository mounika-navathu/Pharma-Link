// frontend/src/pages/VendorLogin.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const VendorLogin = () => {
  const [credentials, setCredentials] = useState({ email:'', password:'' });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      history.push('/vendor/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Vendor Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setCredentials({...credentials, email: e.target.value})} className="border p-1 mb-2 block w-full" required />
        <input type="password" placeholder="Password" onChange={e => setCredentials({...credentials, password: e.target.value})} className="border p-1 mb-2 block w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">Login</button>
      </form>
    </div>
  );
};

export default VendorLogin;
