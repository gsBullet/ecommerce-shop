import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContest";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, Tag, X, MapPin } from "lucide-react";

const BASE_URL = "http://localhost:9000/";

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    products: all_product,
    getTotalAmount,
    addToCart,
    clearCart,
    getTotalItems,
    deleteCartItem,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [shippingLocation, setShippingLocation] = useState("dhaka"); // "dhaka" or "outside"

  const shippingCost = shippingLocation === "dhaka" ? 60 : 120;

  const decreaseQuantity = (productId, size) => {
    const cartKey = `${productId}_${size}`;
    if (cartItems[cartKey]?.quantity > 1) {
      removeFromCart(cartKey);
    } else {
      removeFromCart(cartKey);
    }
  };

  const params = new URLSearchParams({
    totalAmount: getTotalAmount(),
    shippingCost: shippingCost,
    shippingLocation: shippingLocation,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {Object.entries(cartItems).length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
                <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Add some products to get started!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              Object.entries(cartItems).map(([cartKey, item]) => {
                const product = all_product.find(
                  (p) => p.id === item.productId,
                );
                if (!product) return null;

                return (
                  <div
                    key={cartKey}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={BASE_URL + product.thumbnail}
                          alt={product.name}
                          className="w-full sm:w-32 h-32 object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                          <button
                            onClick={() => deleteCartItem(cartKey)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                            Size: {item.size}
                          </span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${product.new_price}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                            <button
                              onClick={() =>
                                decreaseQuantity(item.productId, item.size)
                              }
                              className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            </button>
                            <span className="px-4 font-semibold text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                addToCart(item.productId, item.size)
                              }
                              className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Subtotal
                            </p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              ${(product.new_price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Clear Cart Button */}
            {Object.entries(cartItems).length > 0 && (
              <button
                onClick={clearCart}
                className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear Cart
              </button>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order Summary
              </h2>

              {/* Shipping Location Selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <p className="font-medium">Shipping Location</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShippingLocation("dhaka")}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      shippingLocation === "dhaka"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Dhaka
                  </button>
                  <button
                    onClick={() => setShippingLocation("outside")}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      shippingLocation === "outside"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Outside Dhaka
                  </button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Tag className="w-5 h-5" />
                  <p className="font-medium">Have a promo code?</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  />
                  <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getTotalAmount()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    Shipping{" "}
                    {shippingLocation === "dhaka"
                      ? "(Dhaka)"
                      : "(Outside Dhaka)"}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    ${shippingCost}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${getTotalAmount() + shippingCost}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={getTotalItems() === 0}
                onClick={() => navigate(`/checkout?${params.toString()}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
              >
                Proceed to Checkout
              </button>

              <button
                disabled={getTotalItems() === 0}
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 disabled:cursor-not-allowed"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
