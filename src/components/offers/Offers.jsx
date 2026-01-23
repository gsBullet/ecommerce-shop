import React, { useState } from 'react';
import exclusiveImage from "../assets/Frontend_Assets/exclusive_image.png";
import { Sparkles, Tag, ArrowRight, Users, ShoppingBag, Zap } from 'lucide-react';

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Collections', icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
    { id: 'women', label: 'Women', icon: Sparkles, color: 'from-rose-500 to-pink-500' },
    { id: 'men', label: 'Men', icon: Zap, color: 'from-blue-500 to-indigo-500' },
    { id: 'kids', label: 'Kids', icon: Users, color: 'from-orange-500 to-yellow-500' }
  ];

  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-float animation-delay-1000 opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-float animation-delay-2000 opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-float animation-delay-3000 opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-2xl animate-bounce-subtle">
              <Tag className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Limited Time Offer
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-white leading-none animate-slide-in">
                Exclusive
              </h1>
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-none animate-slide-in animation-delay-200">
                Offer For You
              </h1>
            </div>

            {/* Subtitle */}
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-lg md:text-xl font-bold text-white tracking-wider">
                ONLY ON BEST SELLING PRODUCTS
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <p className="text-white/80 font-semibold text-sm uppercase tracking-wider">
                Choose Your Collection:
              </p>
              <div className="grid grid-cols-2 sm:flex gap-3 flex-wrap">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'bg-white text-gray-900 shadow-2xl scale-105'
                          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'animate-bounce-subtle' : ''}`} />
                        <span>{category.label}</span>
                      </div>
                      {isSelected && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 rounded-2xl blur-xl -z-10 animate-pulse`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Discount Info */}
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-gradient-to-br from-green-400/20 to-emerald-400/20 backdrop-blur-md rounded-2xl border border-green-400/30">
                <p className="text-3xl font-black text-green-400">UP TO 50% OFF</p>
                <p className="text-sm text-white/80">On Selected Items</p>
              </div>
              <div className="px-6 py-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-md rounded-2xl border border-blue-400/30">
                <p className="text-3xl font-black text-blue-400">FREE SHIPPING</p>
                <p className="text-sm text-white/80">Orders Over $99</p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Sparkles className="relative w-6 h-6 animate-spin-slow" />
              <span className="relative uppercase tracking-wider">Check Now</span>
              <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-slate-900 flex items-center justify-center text-white font-bold text-xs">
                    {i}K+
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm">
                <span className="font-bold text-white">10,000+</span> Happy Customers
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 lg:scale-110">
            <div className="relative group">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow"></div>
              
              {/* Image Container */}
              <div className="relative">
                {/* Floating Badges */}
                <div className="absolute -top-6 -left-6 px-5 py-3 bg-white rounded-2xl shadow-2xl animate-float z-20">
                  <p className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    50% OFF
                  </p>
                </div>
                <div className="absolute -bottom-6 -right-6 px-5 py-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl shadow-2xl animate-float animation-delay-1000 z-20">
                  <p className="text-lg font-black text-white">
                    🔥 HOT DEAL
                  </p>
                </div>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={exclusiveImage}
                    alt="Exclusive offer"
                    className="w-full h-auto object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-3xl border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};

export default Offers;