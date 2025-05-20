// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <Route {...rest} render={(props) => {
      if (!token) {
        return <Redirect to="/" />;
      }
      if (allowedRoles && !allowedRoles.includes(role)) {
        return <Redirect to="/" />;
      }
      return <Component {...props} />;
    }} />
  );
};

export default ProtectedRoute;
