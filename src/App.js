import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from "./components/Public/Main"; // Handles internal public routes
import AdminPanel from './components/admin/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import OwnerPage from './components/owner/OwnerPage';
import RestaurantItemsPage from './components/owner/RestaurantItemsPage';
import UserPage from './components/user/UserPage';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/user/Cart';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Main />} /> {/* Catch-all for public pages */}

            {/* Owner, Admin, User routes outside public layout */}
            <Route
              path="/owner-page"
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerPage />
                </ProtectedRoute>
              }
            />
            <Route path="/user-page" element={<UserPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="/restaurants" element={<OwnerPage />} />
            <Route path="/restaurant/:id/items" element={<RestaurantItemsPage />} />
          </Routes>
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
