import { useState } from "react";
import axios from "axios";

export default function ManualPayment() {
  const [form, setForm] = useState({
    method: "bkash",
    phone: "",
    trxId: "",
    amount: ""
  });

  const submitPayment = async () => {
    await axios.post("http://localhost:5000/api/payment/manual", form);
    alert("Payment Submitted!");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Manual Payment</h2>

      <select
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, method: e.target.value })}
      >
        <option value="bkash">bKash</option>
        <option value="nagad">Nagad</option>
        <option value="rocket">Rocket</option>
      </select>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Your Phone Number"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Transaction ID"
        onChange={(e) => setForm({ ...form, trxId: e.target.value })}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Amount"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 mt-4 w-full"
        onClick={submitPayment}
      >
        Submit Payment
      </button>
    </div>
  );
}
