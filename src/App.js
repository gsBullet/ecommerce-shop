import React from "react";
import "./App.css";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ Fixed import
import FrontEndLayout from "./components/layouts/FrontEndLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FrontEndLayout />}>
          <Route index element={<Shop />} />
          {/* <Route path="/shop" element={<ShopCategory category="all" />} /> */}
          <Route path="/men" element={<ShopCategory category="men" />} />
          <Route path="/women" element={<ShopCategory category="women" />} />
          <Route path="/kids" element={<ShopCategory category="kids" />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
