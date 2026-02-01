// src/layouts/DashboardLayout.jsx
import React, { useContext, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FrontendAuthContext } from '../../context/FrontendAuthContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardLayout = () => {
  const { user, logout } = useContext(FrontendAuthContext);
  const { theme, toggleTheme } = useTheme(); // থিম আর টগল ফাংশন নিয়ে আসলাম
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইল সাইডবার ওপেন/ক্লোজ স্টেট

  const location = useLocation();
  const navItems = [
    { path: '/dashboard', label: 'ড্যাশবোর্ড', icon: '🏠' },
    { path: '/orders', label: 'অর্ডার সমূহ', icon: '📦' },
    { path: '/favorites', label: 'পছন্দের প্রোডাক্ট', icon: '❤️' },
    { path: '/profile', label: 'প্রোফাইল', icon: '👤' },
  ];

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          MyShop
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // মোবাইলে লিঙ্কে ক্লিক করলে সাইডবার বন্ধ হবে
              className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors duration-200 ${
                location.pathname === item.path ? 'bg-gray-900 border-l-4 border-blue-500' : ''
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
        <header className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b px-4 py-4 flex justify-between items-center`}>
          <div className="flex items-center">
            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className={`ml-4 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Welcome, {user?.name}!</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
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