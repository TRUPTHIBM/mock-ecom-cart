import React, { useState } from "react";

function Checkout() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const res = await fetch("http://localhost:5001/api/cart/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cart }),
    });

    const data = await res.json();
    setReceipt(data);
    localStorage.removeItem("cart");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Checkout</h2>

      {!receipt ? (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
          <div>
            <label>Name:</label><br />
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Email:</label><br />
            <input name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <button
            type="submit"
            style={{
              marginTop: "15px",
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Checkout Successful!</h3>
          <p><b>Total:</b> ₹{receipt.total}</p>
          <p><b>Time:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
          <p>Thank you, {formData.name}!</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
