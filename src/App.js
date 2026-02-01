import React, { useContext } from "react";
import "./App.css";
import "./index.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import FrontEndLayout from "./components/layouts/FrontEndLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import menBanner from "./components/assets/Frontend_Assets/banner_mens.png";
import womenBanner from "./components/assets/Frontend_Assets/banner_women.png";
import kidsBanner from "./components/assets/Frontend_Assets/banner_kids.png";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ForgetPassword from "./pages/ForgetPassword";
import CheckoutPage from "./pages/CheckoutPage";
import ManualPayment from "./pages/ManualPayment";

import DashboardLayout from "./Dashboard/layouts/DashboardLayout";
import Dashboard from "./Dashboard/pages/Dashboard";
import OrdersPage from "./Dashboard/pages/OrdersPage";
import FavoritesPage from "./Dashboard/pages/FavoritesPage";
import ProfilePage from "./Dashboard/pages/ProfilePage";
import EditProfilePage from "./Dashboard/pages/EditProfilePage";

import FrontendAuthContextProvider, {
  FrontendAuthContext,
} from "./context/FrontendAuthContext";
import { ThemeProvider } from './context/ThemeContext'; 
/* ✅ Protected Route Component */
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(FrontendAuthContext);

    if (user === undefined) return null;

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  return children;
};

const App = () => {
  return (

    <ThemeProvider>
    
    <FrontendAuthContextProvider>
      <HashRouter>
        <Routes>
          {/* ---------- Frontend ---------- */}
          <Route path="/" element={<FrontEndLayout />}>
            <Route index element={<Shop />} />

            <Route
              path="men"
              element={<ShopCategory banner={menBanner} category="men" />}
            />
            <Route
              path="women"
              element={<ShopCategory banner={womenBanner} category="women" />}
            />
            <Route
              path="kids"
              element={<ShopCategory banner={kidsBanner} category="kids" />}
            />

            <Route path="product/:productId" element={<Product />} />

            {/* ---------- Auth ---------- */}
            <Route path="/log-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Route>

          {/* ---------- Dashboard (Protected) ---------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<EditProfilePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route
              path="checkout/manual-payment/:amount"
              element={<ManualPayment />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </FrontendAuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
