import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show a loading screen while checking auth state

  return user ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default PrivateRoute;
