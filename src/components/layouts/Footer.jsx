import React from "react";
import { Instagram, MessageCircle, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold">S</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SHOPPER
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your premium destination for the latest trends and timeless classics. Shop with confidence and style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Company", "Products", "Offices", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300 -z-10 blur-sm opacity-50"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram", color: "from-purple-500 to-pink-500" },
                { icon: Share2, label: "Pinterest", color: "from-red-500 to-pink-500" },
                { icon: MessageCircle, label: "WhatsApp", color: "from-green-500 to-emerald-500" }
              ].map(({ icon: Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  className="group relative"
                  aria-label={label}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2023 Shopper. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;