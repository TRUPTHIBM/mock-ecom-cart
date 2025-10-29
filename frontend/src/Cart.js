import React, { useEffect, useState } from "react";
import { getCart, removeCartItem } from "./api";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    await removeCartItem(id);
    loadCart();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc" }}>Item</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Qty</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price * item.qty}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{ marginTop: "20px" }}>Total: ₹{cart.total}</h3>
        </>
      )}
    </div>
  );
}
