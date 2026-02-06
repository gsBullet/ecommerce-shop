// src/layouts/DashboardLayout.jsx
import React, { useContext, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { FrontendAuthContext } from "../../context/FrontendAuthContext";
import { useTheme } from "../../context/ThemeContext";
import { ShopContext } from "../../context/ShopContest";

const DashboardLayout = () => {
  const { user, logout } = useContext(FrontendAuthContext);
  const { getTotalItems } = useContext(ShopContext);
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/orders", label: "Orders", icon: "📦" },
    { path: "/favorites", label: "Favorites", icon: "❤️" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/cart", label: "Cart", icon: "🛒" },
  ];

  return (
    <div
      className={`flex h-screen  ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed border-r border-gray-600 inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full "
        }`}
      >
        <div className="p-5 text-2xl font-bold border-b border-gray-700">
          MyShop
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // মোবাইলে লিঙ্কে ক্লিক করলে সাইডবার বন্ধ হবে
              className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-gray-900 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <header
          className={`w-full ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-sm border-b px-4 py-4 flex justify-between items-center`}
        >
          <div className="flex items-center">
            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1
              className={`ml-4 text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              Welcome, {user?.name}!
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative group p-3 bg-gray-200 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <ShoppingCart className="w-4 h-4 dark:text-white text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
                  {getTotalItems()}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
            </Link>
            <Link
              to="/"
              className="p-2 bg-gray-200 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gray-300 transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <span className="text-gray-700 dark:text-white">🏠</span>
            </Link>
            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
