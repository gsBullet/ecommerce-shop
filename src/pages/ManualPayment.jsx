import { use, useContext, useEffect, useState } from "react";

import { FrontendAuthContext } from "../context/FrontendAuthContext";
import { ManualPaymentService } from "../service/Payment";
import SweetAlert from "../components/common/SweetAlert";

export default function ManualPayment() {
  const { amount:payAmount } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(FrontendAuthContext);

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

  return (
    <div className="my-12">
      <div className="max-w-md mx-auto bg-white "></div>
      <div className="p-10 max-w-md mx-auto bg-white shadow-lg rounded">
        <h2 className=" text-center mb-0">Manual Payment</h2>
        <h2 className="text-center mt-0 text-lg text-rose-600">Payment Now {payAmount}$</h2>
        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        >
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
        </select>

        <input
          type="tel"
          className="border p-2 w-full mt-2"
          placeholder="Your Phone Number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="Transaction ID"
          onChange={(e) => setForm({ ...form, trxId: e.target.value })}
          required
        />

        <input
          type="number"
          name="amount"
          className="border p-2 w-full mt-2"
          placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <button
          className="bg-green-600 text-white px-4 py-2 mt-4 w-full"
          onClick={submitPayment}
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
}
