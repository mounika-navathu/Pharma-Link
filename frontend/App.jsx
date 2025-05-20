// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import VendorRegister from './pages/VendorRegister';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import PatientRegister from './pages/PatientRegister';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" />
        {/* Vendor routes */}
        <Route path="/vendor/register" component={VendorRegister} />
        <Route path="/vendor/login" component={VendorLogin} />
        <ProtectedRoute path="/vendor/dashboard" component={VendorDashboard} allowedRoles={['vendor']} />
        {/* Patient routes */}
        <Route path="/patient/register" component={PatientRegister} />
        <Route path="/patient/login" component={PatientLogin} />
        <ProtectedRoute path="/patient/dashboard" component={PatientDashboard} allowedRoles={['patient']} />
        {/* Admin routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} allowedRoles={['admin']} />
      </Switch>
    </Router>
  );
}

export default App;
