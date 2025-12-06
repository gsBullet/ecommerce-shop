import React, { useContext, useRef } from "react";
import logo from "../assets/Frontend_Assets/logo.png";
import cartIcon from "../assets/Frontend_Assets/cart_icon.png";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../../context/ShopContest";
import nav_dropdown from "../assets/Frontend_Assets/nav_dropdown.png";
import "./navbar.css";
const Navbar = () => {
  const [menu, setMenu] = React.useState();
  const { getTotalCartAmount, getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdrownToggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="py-5 border-b">
      <div className="max-w-7xl m-auto ">
        <div className="flex justify-between items-center p-3 ">
          <div className="navbar">
            <Link to={"/"}>
              <div className="flex items-center gap-1 nav-logo">
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <p className="uppercase">Shopper</p>
              </div>
            </Link>
          </div>
          <img
            className="nav-dropdown cursor-pointer"
            onClick={dropdrownToggle}
            src={nav_dropdown}
            alt=""
          />
          <ul ref={menuRef} className="flex gap-2  md:gap-8 nav-menu">
            {["Shop", "Men", "Women", "Kids"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Shop" ? "/" : `/${item.toLowerCase()}`} // ✅ Special case for Shop
                  onClick={() => setMenu(item)}
                  className={({ isActive }) =>
                    `relative pb-1 text-gray-700 hover:text-black transition duration-150 ${
                      isActive
                        ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-red-500"
                        : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Section - Login & Cart */}
          <div className="flex items-center gap-6">
            <Link
              to="/log-in"
              className="border border-gray-400 rounded-full px-5 py-1 text-gray-700 hover:bg-gray-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-gray-400 rounded-full px-5 py-1 text-gray-700 hover:bg-gray-500 hover:text-white transition hidden"
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="border border-gray-400 rounded-full px-5 py-1 text-gray-700 hover:bg-gray-500 hover:text-white transition hidden"
            >
              Dashboard
            </Link>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative cursor-pointer">
              <img src={cartIcon} alt="Cart" className="w-6 h-6 text-red-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                <p> {getTotalCartItems()}</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
