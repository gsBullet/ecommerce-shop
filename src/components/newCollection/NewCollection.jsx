import React, { useEffect, useState } from "react";
import Item from "../items/Item";
import { Sparkles, Zap, Clock, Star, TrendingUp, ShoppingBag } from "lucide-react";

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNewCollection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:9000/api/new-collections");
      const data = await response.json();
      setNewCollection(data.data);
    } catch (error) {
      console.error("Error fetching collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCollection();
  }, []);

  const filters = [
    { id: 'all', label: 'All', icon: ShoppingBag },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'latest', label: 'Just Dropped', icon: Zap }
  ];

  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-8">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl animate-float">
            <Clock className="w-5 h-5 text-white animate-spin-slow" />
            <span className="text-sm font-bold text-white uppercase tracking-widest">
              Fresh Arrivals • Just Landed
            </span>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight animate-slide-in">
              New Collection
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be the first to discover our latest styles. Handpicked pieces that define contemporary fashion for everyone.
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
            <div className="flex gap-2">
              <Star className="w-5 h-5 text-purple-500 fill-purple-500 animate-pulse" />
              <Star className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse animation-delay-200" />
              <Star className="w-5 h-5 text-blue-500 fill-blue-500 animate-pulse animation-delay-400" />
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-purple-600 shadow-2xl scale-105'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:scale-102'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-purple-600' : 'group-hover:scale-110'}`} />
                  <span>{filter.label}</span>
                </div>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-2xl blur-xl -z-10 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="px-8 py-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {newCollection?.length || 0}+
                </p>
                <p className="text-sm text-gray-600 font-semibold">New Items</p>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Weekly
                </p>
                <p className="text-sm text-gray-600 font-semibold">Fresh Drops</p>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  #1
                </p>
                <p className="text-sm text-gray-600 font-semibold">Trending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-pink-600 animate-spin"></div>
            </div>
            <p className="text-lg font-semibold text-gray-600">Loading amazing styles...</p>
          </div>
        ) : newCollection && newCollection.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newCollection.map((item, index) => (
              <div
                key={item.id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3">
                  {/* Gradient Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-2xl -z-10 scale-95"></div>
                  
                  {/* New Badge */}
                  <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg">
                    <span className="text-xs font-black text-white uppercase tracking-wide flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      New
                    </span>
                  </div>

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
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-full mb-8">
              <ShoppingBag className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">Coming Soon!</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Our newest collection is being carefully curated. Check back soon for fresh styles!
            </p>
          </div>
        )}

        {/* View All Button */}
        {newCollection && newCollection.length > 0 && (
          <div className="text-center mt-16">
            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Sparkles className="relative w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span className="relative uppercase tracking-wider">Explore Full Collection</span>
              <TrendingUp className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
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

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .hover:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default NewCollection;