import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContest";
import { useLocation, useNavigate } from "react-router-dom";
import { FrontendAuthContext } from "../context/FrontendAuthContext";
import { updateUserInfo } from "../service/UpdateUserInfo";
import SweetAlert from "../components/common/SweetAlert";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  FileText,
  ShoppingBag,
  Lock,
  CheckCircle,
  TruckIcon,
} from "lucide-react";

const CheckoutPage = () => {
  const { cartItems, products: all_product } = useContext(ShopContext);
  const { user, isAuthenticated } = useContext(FrontendAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const totalAmounts = queryParams.get("totalAmount");
  const shippingCost = queryParams.get("shippingCost");
  const shippingLocation = queryParams.get("shippingLocation");

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    deliveryMethod: shippingLocation || "dhaka",
  });

  // Load user address
  useEffect(() => {
    if (user?.addresses?.length) {
      setCustomerInfo({
        fullName: user.addresses[0]?.fullName || "",
        phone: user.addresses[0]?.phone || "",
        email: user.addresses[0]?.email || "",
        address: user.addresses[0]?.address || "",
        state: user.addresses[0]?.state || "",
        city: user.addresses[0]?.city || "",
        postalCode: user.addresses[0]?.postalCode || "",
        deliveryMethod: shippingLocation,
      });
    }
  }, [user, isAuthenticated?.isAuth, shippingLocation]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CALCULATION OF TOTAL AMOUNT
  const totalAmount = Object.values(cartItems).reduce((sum, cartItem) => {
    const product = all_product.find((p) => p.id === cartItem.productId);

    if (!product) return sum;

    return sum + product.new_price * cartItem.quantity;
  }, 0);

  const totalAmountWithDelivery = totalAmount + parseInt(shippingCost || 0);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerInfo.deliveryMethod) {
      return SweetAlert({
        icon: "error",
        title: "Please select delivery method",
      });
    }

    const response = await updateUserInfo({
      formData: customerInfo,
      token: isAuthenticated ? user.token : null,
      userId: isAuthenticated ? user._id : null,
    });

    if (response?.success) {
      SweetAlert({
        icon: "success",
        title: response.message,
      });
      navigate(`/checkout/manual-payment/${totalAmountWithDelivery}`);
    } else {
      SweetAlert({
        icon: "error",
        title: response?.message || "Failed to update user info",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ShoppingBag className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Secure Checkout
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your order in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Shipping Info
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Payment
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TruckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <Home className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="123 Main Street, Apartment 4B"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        placeholder="Dhaka"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State/Division
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleInputChange}
                        placeholder="Dhaka Division"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="postalCode"
                        value={customerInfo.postalCode}
                        onChange={handleInputChange}
                        placeholder="1207"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {Object.values(cartItems)
                  .slice(0, 3)
                  .map((item) => {
                    const product = all_product.find(
                      (p) => p.id === item.productId,
                    );
                    if (!product) return null;
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} × ${product.new_price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {Object.values(cartItems).length > 3 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    +{Object.values(cartItems).length - 3} more items
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <TruckIcon className="w-4 h-4" />
                    Delivery Fee
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    ${parseInt(shippingCost || 0)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${totalAmountWithDelivery.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Secure & Encrypted Payment
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={parseInt(totalAmounts) !== parseInt(totalAmount)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-6 h-6" />
                Proceed to Payment
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                By completing this purchase you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
