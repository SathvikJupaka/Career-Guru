
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RecruiterProtectedRoutes = ({ children }) => {
  // Get the cookies from the browser
  const jwtToken = Cookies.get('recruiter_jwt_token');

  // If the cookie is present, it's a valid recruiter; otherwise, navigate to the login page
  return jwtToken ? <Outlet /> : <Navigate to="/" replace/>;
};
 
export default RecruiterProtectedRoutes;