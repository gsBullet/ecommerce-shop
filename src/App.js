import React from "react";
import "./App.css";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ Fixed import
import FrontEndLayout from "./components/layouts/FrontEndLayout";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Men from "./pages/Men";
// import Women from "./pages/Women";
// import Kids from "./pages/Kids";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import menBanner from "./components/assets/Frontend_Assets/banner_mens.png";
import womenBanner from "./components/assets/Frontend_Assets/banner_women.png";
import kidsBanner from "./components/assets/Frontend_Assets/banner_kids.png";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<FrontEndLayout />}>
            <Route index element={<Shop />} />
            {/* <Route path="/shop" element={<ShopCategory category="all" />} /> */}
            <Route
              path="/men"
              element={<ShopCategory banner={menBanner} category="men" />}
            />
            <Route
              path="/women"
              element={<ShopCategory banner={womenBanner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCategory banner={kidsBanner} category="kid" />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
    </HashRouter>
  );
};

export default App;
