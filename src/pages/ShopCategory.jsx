import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContest";
import {
  ChevronDown,
  Grid3x3,
  LayoutGrid,
  SlidersHorizontal,
  Sparkles,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  MessageSquare,
  Package,
} from "lucide-react";

const BASE_URL = "http://localhost:9000/";

const ShopCategory = (props) => {
  const { products: all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("featured");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredProducts =
    all_product?.filter(
      (product) =>
        product.category?.name?.toLowerCase() === props.category?.toLowerCase(),
    ) || [];

  const displayedProducts = filteredProducts.slice(0, 12);
  const totalProducts = filteredProducts.length;

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Hero Banner with Parallax Effect */}
      <div className="relative h-[400px] overflow-hidden border container mx-auto mb-16">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600" /> */}
        <div className="absolute inset-0 opacity-30">
        </div>
        
        <img
          className="absolute inset-0 w-full h-full object-fit mx-auto container mix-blend-overlay shadow-xl"
          src={props.banner}
          alt={props.category}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
          {/* Floating Badge */}
          <div className="relative mb-6 animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400  rounded-full" />
            <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">PREMIUM COLLECTION 2024</span>
            </div>
          </div>

          {/* Title with Gradient Text */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 capitalize text-center relative">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent blur-lg opacity-50">
              {props.category}
            </span>
            <span className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400  bg-clip-text text-transparent">
              {props.category}
            </span>
          </h1>

          <p className="text-xl md:text-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600  bg-clip-text text-transparent max-w-3xl text-center font-light mb-8">
            Handpicked excellence • Trending styles • Limited editions
          </p>

          {/* Stats */}
         <div className="flex items-center justify-center gap-6 mt-6">
      {/* Products Stat */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[120px] hover:scale-105 transition-transform">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-1">{totalProducts}+</div>
          <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Products</div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-white/40" />
        <div className="w-1 h-1 rounded-full bg-white/60" />
        <div className="w-1 h-1 rounded-full bg-white/40" />
      </div>

      {/* Rating Stat */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[120px] hover:scale-105 transition-transform">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-1">4.9★</div>
          <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Rating</div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-white/40" />
        <div className="w-1 h-1 rounded-full bg-white/60" />
        <div className="w-1 h-1 rounded-full bg-white/40" />
      </div>

      {/* Reviews Stat */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[120px] hover:scale-105 transition-transform">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-1">2.5k+</div>
          <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Reviews</div>
        </div>
      </div>
    </div>
        </div>

        {/* Wave Divider */}
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 fill-indigo-500">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        {/* Filter Bar - Enhanced */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Side - Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">AVAILABLE NOW</p>
                <p className="text-lg font-bold text-gray-900">
                  {displayedProducts.length} of {totalProducts} Products
                </p>
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                <button className="p-3 bg-white rounded-lg shadow-sm border border-purple-200">
                  <LayoutGrid className="w-5 h-5 text-purple-600" />
                </button>
                <button className="p-3 rounded-lg hover:bg-white transition-colors">
                  <Grid3x3 className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all font-semibold border border-gray-200">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Sort by: {sortOption}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${showSortMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                    {["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Sellers"].map((option, idx) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option.toLowerCase());
                          setShowSortMenu(false);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-700 hover:text-purple-600 transition-all font-medium flex items-center gap-3 group"
                      >
                        <div className={`w-2 h-2 rounded-full ${sortOption === option.toLowerCase() ? 'bg-purple-600' : 'bg-gray-300'} group-hover:bg-purple-600`} />
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.08}s both`,
              }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-gray-100">
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={BASE_URL + product.thumbnail}
                    alt={product.name}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Discount Badge */}
                  {product.old_price && (
                    <div className="absolute top-4 left-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-500 blur-lg opacity-50" />
                        <div className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          {Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-red-500 hover:text-white hover:scale-110">
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <button className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-colors shadow-xl flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                    <button className="px-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition-colors shadow-xl">
                      View
                    </button>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">4.8</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors text-lg leading-tight flex-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${product.new_price}
                      </span>
                      {product.old_price && (
                        <span className="text-sm text-gray-400 line-through font-medium">
                          ${product.old_price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Indicator */}
                  {product.quantity && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${product.quantity > 10 ? "bg-green-500 animate-pulse" : "bg-orange-500"}`} />
                        <span className={`text-xs font-semibold ${product.quantity > 10 ? "text-green-600" : "text-orange-600"}`}>
                          {product.quantity > 10 ? "In Stock" : `Only ${product.quantity} left!`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Accent with Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Enhanced */}
        {displayedProducts.length < totalProducts && (
          <div className="text-center pb-20">
            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Explore More Products</span>
              <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ShopCategory;