import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import VerifyEmail from "../../components/Authentication/User/VerifyEmail";
import Register from "../../components/Authentication/User/Register";
import Home from "../../components/Authentication/User/Home";
import Login from "../../components/Authentication/User/Login";
import UserProfile from "../../components/Authentication/User/UserProfile";
import Logout from "../../components/Authentication/User/Logout";
import Navbar from "../../components/Authentication/User/Navbar";
import Footer from "../../components/Authentication/User/Footer";
import ForgotPassword from "../../components/Authentication/User/ForgotPassword";
import ResetPassword from "../../components/Authentication/User/ResetPassword";
import InvalidPage from "../../components/Authentication/User/InvalidPage";

function ProtectedRoute({ children }) {
  const isAuth = Cookies.get("is_auth"); // Check if the user is authenticated

  if (!isAuth) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the children components
}

function AllRoutes() {
  const location = useLocation();

  // Determine if the current route is UserProfile
  const isUserProfile = location.pathname === "/user-profile";

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!isUserProfile && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute>
              <VerifyEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<InvalidPage />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isUserProfile && <Footer />}
    </div>
  );
}

export default AllRoutes;
