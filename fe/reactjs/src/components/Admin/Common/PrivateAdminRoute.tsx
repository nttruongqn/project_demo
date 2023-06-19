import React from 'react'
import { AdminLayout } from '../Layout/AdminLayout';
import { Navigate } from 'react-router-dom';

export function PrivateAdminRoute() {
 const isLoggedIn = Boolean(localStorage.getItem('access_token'));
 return isLoggedIn ? <AdminLayout /> : <Navigate to="/login" />
}
