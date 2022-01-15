import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoutes = () => {
  const isLogged = !!localStorage.getItem('token') // determine if authorized, from context or however you're doing it
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isLogged ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes