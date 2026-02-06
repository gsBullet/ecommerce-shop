import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FrontendAuthContext } from "../context/FrontendAuthContext";
import { ManualPaymentService } from "../service/Payment";
import SweetAlert from "../components/common/SweetAlert";
import { ShopContext } from "../context/ShopContest";
import {
  Wallet,
  Phone,
  Hash,
  DollarSign,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function ManualPayment() {
  const { amount: payAmount } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(FrontendAuthContext);
  const { clearCart } = useContext(ShopContext);

  const products = JSON.parse(localStorage.getItem("cart_v1")) || [];

  const [form, setForm] = useState({
    paymentMethod: "bkash",
    phone: "",
    trxId: "",
    amount: 0,
  });

  useEffect(() => {
    setForm({
      ...form,
      customerId: user?._id,
      products,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated?.isAuth]);

  const submitPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await ManualPaymentService(form, isAuthenticated.token);
      if (response?.success) {
        SweetAlert({
          icon: "success",
          title: response.message,
        });
        clearCart();
        navigate("/");
      } else {
        SweetAlert({
          icon: "error",
          title: response.message,
        });
      }
    } catch (error) {
      SweetAlert({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  const paymentMethods = [
    {
      value: "bkash",
      name: "bKash",
      color: "from-pink-500 to-pink-600",
      icon: "💳",
    },
    {
      value: "nagad",
      name: "Nagad",
      color: "from-orange-500 to-orange-600",
      icon: "🏦",
    },
    {
      value: "rocket",
      name: "Rocket",
      color: "from-purple-500 to-purple-600",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Secure and fast payment processing
          </p>
        </div>

        {/* Amount Display Card */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium mb-2">
              Total Amount Due
            </p>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-8 h-8 text-white" />
              <h2 className="text-5xl font-bold text-white">{payAmount}</h2>
            </div>
          </div>
        </div>

        {/* Payment Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Security Badge */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 border-b border-green-100 dark:border-green-800">
            <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold">
                🔒 Secure Payment Gateway
              </span>
            </div>
          </div>

          <form onSubmit={submitPayment} className="p-8 space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                <CreditCard className="inline w-5 h-5 mr-2" />
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, paymentMethod: method.value })
                    }
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      form.paymentMethod === method.value
                        ? `border-transparent bg-gradient-to-r ${method.color} text-white shadow-lg`
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                    }`}
                  >
                    {form.paymentMethod === method.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="text-sm font-bold">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-semibold mb-1">Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Send money to our {form.paymentMethod.toUpperCase()} number</li>
                    <li>Enter your payment details below</li>
                    <li>Submit to confirm your order</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Your Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-lg"
                  required
                />
              </div>
            </div>

            {/* Transaction ID Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <Hash className="inline w-4 h-4 mr-2" />
                Transaction ID
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={form.trxId}
                  onChange={(e) => setForm({ ...form, trxId: e.target.value })}
                  placeholder="Enter Transaction ID"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-lg"
                  required
                />
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Payment Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder={`Enter ${payAmount}`}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-lg font-semibold"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Please enter the exact amount: ${payAmount}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
            >
              <CheckCircle className="w-6 h-6" />
              Confirm Payment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Security Notice */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              🔐 Your payment information is secure and encrypted
            </p>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}