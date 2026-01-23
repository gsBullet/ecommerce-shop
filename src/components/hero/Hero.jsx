import "./hero.css";
import React from 'react';
import handIcon from "../assets/Frontend_Assets/hand_icon.png";
import arrowIcon from "../assets/Frontend_Assets/arrow.png";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 animate-fade-in">
              <span className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                Women
              </span>
              <span className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                Men
              </span>
              <span className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                Kids
              </span>
            </div>

            {/* Badge */}
            <div className="inline-block">
              <span className="uppercase tracking-widest text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                ✨ New Arrivals Only
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight">
                  New
                </h1>
                <div className="animate-bounce">
                  <img 
                    src={handIcon} 
                    alt="Hand Icon" 
                    className="w-16 h-16 lg:w-24 lg:h-24 drop-shadow-2xl" 
                  />
                </div>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                Collections
              </h1>
              <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-tight">
                For Everyone
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Discover the latest trends in fashion for the whole family. From elegant women's wear to stylish men's clothing and adorable kids' collections.
            </p>

            {/* CTA Button */}
            <button className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative uppercase tracking-wide">Explore Latest Collections</span>
              <img 
                src={arrowIcon} 
                alt="Arrow" 
                className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" 
              />
            </button>

            {/* Stats */}
            <div className="flex gap-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600">New Styles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10">
            <div className="relative group">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                  alt="Featured collection showcase"
                  className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl animate-float">
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🔥 Trending Now
                </span>
              </div>
            </div>
          </div>
        </div>
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;