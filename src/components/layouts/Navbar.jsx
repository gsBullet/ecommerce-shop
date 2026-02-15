import React, { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, UserPlus } from "lucide-react";
import { ShopContext } from "../../context/ShopContest";
import { FrontendAuthContext } from "../../context/FrontendAuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(FrontendAuthContext);
  const [menu, setMenu] = React.useState();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getTotalItems } = useContext(ShopContext);

  const dropdownToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-0 -left-4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
              SHOPPER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {["Shop", "Men", "Women", "Kids"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Shop" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMenu(item)}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-gray-300 font-medium transition-all duration-300 group ${
                      isActive ? "text-white" : "hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item}</span>
                      <span
                        className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transform transition-all duration-300 ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-20"
                        }`}
                      ></span>
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Section - Auth & Cart */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated.isAuth ? (
                <>
                  <Link
                    to="/dashboard"
                    className="group relative px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="group relative px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/log-in"
                    className="group relative px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  </Link>
                  <Link
                    to="/register"
                    className="group relative px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative group p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg animate-bounce">
                  {getTotalItems()}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={dropdownToggle}
              className="lg:hidden p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 space-y-3">
            {/* Mobile Navigation Links */}
            {["Shop", "Men", "Women", "Kids"].map((item) => (
              <NavLink
                key={item}
                to={item === "Shop" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => {
                  setMenu(item);
                  setIsMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-gray-300 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "hover:bg-white/10"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {isAuthenticated.isAuth ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/log-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </nav>
  );
};

export default Navbar;