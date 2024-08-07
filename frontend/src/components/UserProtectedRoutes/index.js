import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProtectedRoutes = () => {
  const userToken = Cookies.get('user_jwt_token');

  return userToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserProtectedRoutes;