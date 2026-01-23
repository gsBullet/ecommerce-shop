import "./popular.css";
import React, { useContext } from "react";
import Item from "../items/Item";
import { ShopContext } from "../../context/ShopContest";
import { Sparkles, TrendingUp, Heart } from "lucide-react";

const Popular = () => {
  const { products: all_product } = useContext(ShopContext);

  const womenProduct =
    all_product?.filter(
      (product) => product.category?.name?.toLowerCase() === "women"
    ) || [];

  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
              Trending Collection
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Popular in Women
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most-loved pieces that are turning heads this season. Curated styles that blend elegance with modern trends.
            </p>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"></div>
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
            <TrendingUp className="w-6 h-6 text-rose-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{womenProduct.length}+</p>
              <p className="text-sm text-gray-600">Trending Items</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
            <Heart className="w-6 h-6 text-purple-500 fill-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">5K+</p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">New</p>
              <p className="text-sm text-gray-600">Weekly Drops</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {womenProduct.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {womenProduct.map((item, index) => (
              <div
                key={item._id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"></div>
                  
                  <Item
                    id={item.id}
                    image={item.thumbnail}
                    name={item.name}
                    new_price={item.new_price}
                    old_price={item.old_price}
                    quantity={item.quantity}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full mb-6">
              <Sparkles className="w-12 h-12 text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
            <p className="text-gray-600">Check back soon for our latest collection!</p>
          </div>
        )}

        {/* View All Button */}
        {womenProduct.length > 0 && (
          <div className="text-center mt-16">
            <button className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Explore Full Collection</span>
              <TrendingUp className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Popular;