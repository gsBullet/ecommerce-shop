import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContest";
import { useNavigate } from "react-router-dom";
import { FrontendAuthContext } from "../context/FrontendAuthContext";
import { updateUserInfo } from "../service/UpdateUserInfo";
import SweetAlert from "../components/common/SweetAlert";

const CheckoutPage = () => {
  const { cartItems, products: all_product } = useContext(ShopContext);
  const { user, isAuthenticated } = useContext(FrontendAuthContext);
  const navigate = useNavigate();

  const [deliveryFee, setDeliveryFee] = useState(0);

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    deliveryMethod: "inside-dhaka",
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
        deliveryMethod: user.addresses[0]?.deliveryMethod || "inside-dhaka",
      });
    }
  }, [user, isAuthenticated?.isAuth]);

  // Delivery fee calculation
  useEffect(() => {
    if (customerInfo.deliveryMethod === "inside-dhaka") {
      setDeliveryFee(60);
    } else if (customerInfo.deliveryMethod === "outside-dhaka") {
      setDeliveryFee(120);
    }
  }, [customerInfo.deliveryMethod]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delivery method change
  const handleDeliveryChange = (e) => {
    setCustomerInfo((prev) => ({
      ...prev,
      deliveryMethod: e.target.value,
    }));
  };

  // CALCULATION OF TOTAL AMOUNT
  const totalAmount = Object.values(cartItems).reduce((sum, cartItem) => {
    const product = all_product.find((p) => p.id === cartItem.productId);

    if (!product) return sum;

    return sum + product.new_price * cartItem.quantity;
  }, 0);

  const totalAmountWithDelivery = totalAmount + deliveryFee;

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <form onSubmit={handleSubmit}>
            {/* Customer Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "fullName",
                  "phone",
                  "email",
                  "city",
                  "state",
                  "postalCode",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={customerInfo[field]}
                    onChange={handleInputChange}
                    placeholder={field}
                    className="border px-3 py-2 rounded-md"
                    required
                  />
                ))}

                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="border px-3 py-2 rounded-md md:col-span-2"
                  placeholder="Address"
                  required
                />
              </div>
            </div>

            {/* Delivery Method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Delivery Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="inside-dhaka"
                    checked={customerInfo.deliveryMethod === "inside-dhaka"}
                    onChange={handleDeliveryChange}
                    className="cursor-pointer"
                  />
                  Inside Dhaka - 60$
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="outside-dhaka"
                    checked={customerInfo.deliveryMethod === "outside-dhaka"}
                    onChange={handleDeliveryChange}
                    className="cursor-pointer"
                  />
                  Outside Dhaka - 120$
                </label>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${totalAmountWithDelivery.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
            >
              PAYMENT NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
