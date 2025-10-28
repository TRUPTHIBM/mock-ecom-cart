import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "./api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToCart = async (id) => {
    await addToCart(id, 1);
    alert("Added to cart!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
