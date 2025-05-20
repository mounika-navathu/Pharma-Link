// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role');
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div className="font-bold">PharmaLink</div>
      <div>
        {!role && (
          <>
            <Link to="/patient/login" className="mx-2">Patient Login</Link>
            <Link to="/patient/register" className="mx-2">Patient Register</Link>
            <Link to="/vendor/login" className="mx-2">Vendor Login</Link>
            <Link to="/vendor/register" className="mx-2">Vendor Register</Link>
            <Link to="/admin/login" className="mx-2">Admin</Link>
          </>
        )}
        {role === 'patient' && (
          <>
            <Link to="/patient/dashboard" className="mx-2">Dashboard</Link>
            <button onClick={handleLogout} className="mx-2">Logout</button>
          </>
        )}
        {role === 'vendor' && (
          <>
            <Link to="/vendor/dashboard" className="mx-2">Dashboard</Link>
            <button onClick={handleLogout} className="mx-2">Logout</button>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link to="/admin/dashboard" className="mx-2">Dashboard</Link>
            <button onClick={handleLogout} className="mx-2">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
