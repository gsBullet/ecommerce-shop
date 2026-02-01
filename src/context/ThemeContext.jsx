// src/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // localStorage থেকে থিম পড়ার চেষ্টা করবে, না পেলে 'light' হবে ডিফল্ট
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // থিম টগল করার ফাংশন
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // localStorage এ সেভ করে রাখবে
  };

  // থিম পালটালে <html> ট্যাগে `dark` ক্লাস যোগ বা সরাবে
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// সহজে থিম আর টগল ফাংশন ব্যবহার করার জন্য একটা হুক
export const useTheme = () => useContext(ThemeContext);