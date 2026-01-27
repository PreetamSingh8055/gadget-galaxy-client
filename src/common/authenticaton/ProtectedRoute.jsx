import { useUser } from "@/context/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenication, loading } = useUser();

  // Wait until getProfile() finishes
  if (loading) {
    return (
      <div className="text-white text-center py-10 text-xl">Loading...</div>
    );
  }

  // Now check auth
  return isAuthenication ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
