import React, { useState } from "react";
import { Mail, Gift, Bell, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Mail className="absolute top-20 left-10 w-8 h-8 text-purple-300 opacity-30 animate-float" />
        <Gift className="absolute top-40 right-20 w-10 h-10 text-pink-300 opacity-30 animate-float animation-delay-1000" />
        <Bell className="absolute bottom-32 left-1/4 w-7 h-7 text-blue-300 opacity-30 animate-float animation-delay-2000" />
        <Sparkles className="absolute top-1/3 right-1/3 w-9 h-9 text-purple-300 opacity-30 animate-float animation-delay-3000" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl animate-bounce-subtle">
            <Mail className="w-10 h-10 text-white" />
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight animate-slide-in">
              Get Exclusive Offers
            </h1>
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight animate-slide-in animation-delay-200">
              On Your Email
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter and stay updated with the latest trends, exclusive deals, and early access to new collections.
          </p>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto py-6">
            <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Gift className="w-8 h-8 text-yellow-300" />
              <p className="text-white font-semibold text-sm">Exclusive Discounts</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Bell className="w-8 h-8 text-pink-300" />
              <p className="text-white font-semibold text-sm">Early Access</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Sparkles className="w-8 h-8 text-purple-300" />
              <p className="text-white font-semibold text-sm">Style Tips</p>
            </div>
          </div>

          {/* Subscription Input */}
          <div className="max-w-2xl mx-auto">
            {!isSubscribed ? (
              <div className="relative">
                <div className={`flex flex-col sm:flex-row gap-4 p-3 bg-white rounded-full shadow-2xl transition-all duration-300 ${
                  isFocused ? 'ring-4 ring-purple-400/50 scale-105' : ''
                }`}>
                  <div className="flex-1 relative">
                    <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                      placeholder="Enter your email address"
                      className="w-full pl-14 pr-6 py-4 text-gray-900 placeholder-gray-400 bg-transparent outline-none font-medium text-lg"
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      Subscribe
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl animate-scale-in">
                <CheckCircle className="w-8 h-8 text-white animate-bounce-subtle" />
                <span className="text-white font-bold text-xl">Successfully Subscribed! 🎉</span>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-purple-900 flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">👤</span>
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-sm font-medium">
                <span className="font-bold text-white">25,000+</span> subscribers
              </p>
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>

          {/* Privacy Notice */}
          <p className="text-purple-200 text-sm max-w-xl mx-auto">
            🔒 We respect your privacy. Unsubscribe anytime. No spam, just exclusive fashion updates.
          </p>
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
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
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

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
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

export default NewsLetter;