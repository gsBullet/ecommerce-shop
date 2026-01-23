import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, TrendingUp } from "lucide-react";

const BASE_URL = process.env.REACT_APP_BACKEND_IMG_URL;

const Item = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const discountPercentage = Math.round(
    ((props.old_price - props.new_price) / props.old_price) * 100
  );

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-purple-500/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
          <TrendingUp className="w-3 h-3" />
          -{discountPercentage}%
        </div>
      )}

      {/* Quantity Badge */}
      {props.quantity && (
        <div className="absolute top-3 right-3 z-10 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          Stock: {props.quantity}
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${props.id}`} className="relative block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={BASE_URL + props.image}
            alt={props.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110 rotate-2" : "scale-100"
            }`}
          />
          
          {/* Overlay gradient on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Quick action buttons */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className={`p-3 backdrop-blur-sm rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                isFavorite
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                  : "bg-white/90 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="relative p-5 space-y-3">
        {/* Product Name */}
        <Link to={`/product/${props.id}`}>
          <h3
            className="text-white font-semibold text-lg line-clamp-2 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:bg-clip-text transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            {props.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ${props.new_price}
            </div>
            {props.old_price && props.old_price !== props.new_price && (
              <div className="text-sm text-gray-500 line-through">
                ${props.old_price}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Link to={`/product/${props.id}`}>
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </Link>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </div>
  );
};

export default Item;