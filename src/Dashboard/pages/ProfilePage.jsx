import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Package, ShoppingBag, Heart, X, Edit2, Moon, Sun, Truck, Clock, CheckCircle, XCircle, Star, MessageSquare, Send } from 'lucide-react';

export default function ProfilePage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const [formData, setFormData] = useState({
    name: 'Sophia Anderson',
    email: 'sophia.anderson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Fashion enthusiast and sustainable shopping advocate. Love discovering unique pieces and supporting local brands.',
    birthdate: '1995-03-15',
    address: '742 Market Street, San Francisco, CA 94102',
    company: 'Tech Innovations Inc.'
  });

  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      status: 'pending',
      product: 'Wireless Noise-Cancelling Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      price: 299.99,
      quantity: 1,
      date: '2024-01-28',
      estimatedDelivery: '2024-02-05'
    },
    {
      id: 'ORD-2024-002',
      status: 'confirmed',
      product: 'Smart Watch Series 8',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      price: 449.99,
      quantity: 1,
      date: '2024-01-25',
      estimatedDelivery: '2024-02-03'
    },
    {
      id: 'ORD-2024-003',
      status: 'delivered',
      product: 'Premium Leather Backpack',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      price: 159.99,
      quantity: 1,
      date: '2024-01-20',
      deliveredDate: '2024-01-26',
      review: null
    },
    {
      id: 'ORD-2024-004',
      status: 'delivered',
      product: 'Minimalist Desk Lamp',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
      price: 79.99,
      quantity: 2,
      date: '2024-01-15',
      deliveredDate: '2024-01-22',
      review: {
        rating: 5,
        comment: 'Absolutely love it! Perfect lighting for my workspace.'
      }
    }
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleConfirmDelivery = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'delivered', deliveredDate: new Date().toISOString().split('T')[0] }
        : order
    ));
  };

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setRating(order.review?.rating || 0);
    setReviewComment(order.review?.comment || '');
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, review: { rating, comment: reviewComment } }
        : order
    ));
    
    setReviewModalOpen(false);
    setRating(0);
    setReviewComment('');
    setSelectedOrder(null);
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        text: 'Pending',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        borderColor: 'border-yellow-300 dark:border-yellow-700'
      },
      confirmed: {
        icon: CheckCircle,
        text: 'Confirmed',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-700 dark:text-blue-400',
        iconColor: 'text-blue-600 dark:text-blue-400',
        borderColor: 'border-blue-300 dark:border-blue-700'
      },
      delivered: {
        icon: Truck,
        text: 'Delivered',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-700 dark:text-green-400',
        iconColor: 'text-green-600 dark:text-green-400',
        borderColor: 'border-green-300 dark:border-green-700'
      }
    };
    return configs[status];
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-slate-900 transition-all duration-500">
        
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent mb-2 tracking-tight">
                My Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Manage your account and preferences</p>
            </div>
            
           
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transform hover:scale-105 transition-all duration-500">
                
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Avatar */}
                <div className="relative px-6 pb-6">
                  <div className="relative -mt-16 mb-4">
                    <div className="relative inline-block">
                      <img
                        src="https://images.unsplash.com/photo130?w=400&h=400&fit=crop"
                        alt="Profile"
                        className="w-32 h-32 rounded-3xl border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
                      />
                      <button className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formData.name}</h2>
                    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <Mail className="w-4 h-4" />
                      <span>{formData.email}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-sm font-bold shadow-md">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Premium Member
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        47
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Orders</div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        128
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Wishlist</div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        32
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="mt-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-500">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  Shopping Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Spent</span>
                    <span className="text-lg font-bold text-purple-600">$3,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Saved</span>
                    <span className="text-lg font-bold text-green-600">$892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Jan 2023</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Information */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transform hover:shadow-2xl transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                    Personal Information
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold"
                  >
                    <Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                      <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Location</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formData.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Birthday</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">March 15, 1995</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                      <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Company</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formData.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">About</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{formData.bio}</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transform hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-pink-600 to-red-600 rounded-full"></div>
                  Shipping Address
                </h3>
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-700/30 rounded-2xl">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Primary Address</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{formData.address}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transform hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: ShoppingBag, text: 'Purchased Wireless Headphones', time: '2 days ago', color: 'purple' },
                    { icon: Heart, text: 'Added Smart Watch to wishlist', time: '5 days ago', color: 'pink' },
                    { icon: Package, text: 'Order #3847 delivered', time: '1 week ago', color: 'red' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer">
                      <div className={`p-3 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-xl group-hover:scale-110 transition-transform`}>
                        <activity.icon className={`w-5 h-5 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{activity.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders History Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Order History
                </h3>
              </div>
            </div>

            {/* Tabs */}
            <div className="p-4 sm:p-6 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {[
                  { key: 'all', label: 'All Orders', count: orders.length },
                  { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
                  { key: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
                  { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
                  { key: 'cancelled', label: 'Cancelled', count: 0 },
                  { key: 'returned', label: 'Returned', count: 0 }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Serial</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Order Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.map((order, index) => {
                    const statusConfig = getStatusConfig(order.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{index + 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white block">{order.product}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{order.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            ৳{(order.price * order.quantity).toFixed(0)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="p-2 bg-purple-500/20 dark:bg-purple-900/30 rounded-lg hover:bg-purple-500/30 transition-colors">
                            <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-500/20 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                            nagad
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                            <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                            {statusConfig.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                                title="Cancel Order"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                            
                            {order.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                                  title="Cancel Order"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => openReviewModal(order)}
                                  className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-lg hover:shadow-lg transition-all"
                                  title="Add Review & Rating"
                                >
                                  <Star className="w-5 h-5" />
                                </button>
                              </>
                            )}

                            {order.status === 'delivered' && (
                              <button
                                onClick={() => openReviewModal(order)}
                                className={`p-2 rounded-lg transition-all ${
                                  order.review 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:shadow-lg'
                                }`}
                                title={order.review ? 'View/Edit Review' : 'Add Review & Rating'}
                              >
                                <Star className={`w-5 h-5 ${order.review ? 'fill-current' : ''}`} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-16">
                  <Package className="w-20 h-20 text-gray-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">No orders found</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Orders matching this filter will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Edit2 className="w-6 h-6" />
                    Edit Profile
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                  >
                    <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Birth Date</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none resize-none"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full animate-slideUp">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Star className="w-6 h-6" />
                    Rate Your Purchase
                  </h2>
                  <button
                    onClick={() => {
                      setReviewModalOpen(false);
                      setRating(0);
                      setReviewComment('');
                      setSelectedOrder(null);
                    }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                  >
                    <X className="w-6 h-6 text-gray-900 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleReviewSubmit} className="p-6 sm:p-8 space-y-6">
                {/* Product Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <img 
                    src={selectedOrder.image} 
                    alt={selectedOrder.product}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{selectedOrder.product}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.id}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                    How would you rate this product?
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transform hover:scale-125 transition-all duration-200"
                      >
                        <Star
                          className={`w-12 h-12 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          } transition-all duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {rating === 5 && '🎉 Excellent!'}
                      {rating === 4 && '😊 Great!'}
                      {rating === 3 && '👍 Good'}
                      {rating === 2 && '😐 Fair'}
                      {rating === 1 && '😞 Poor'}
                    </p>
                  )}
                </div>

                {/* Comment Box */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Share your experience (Optional)
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows="4"
                    placeholder="Tell us what you liked or disliked about this product..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none resize-none"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewModalOpen(false);
                      setRating(0);
                      setReviewComment('');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}