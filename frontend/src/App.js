import Checkout from "./Checkout";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <div>
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "#222",
            color: "white",
            padding: "10px",
          }}
        >
          🛒 Vibe Commerce
        </h1>

        <nav style={{ textAlign: "center", margin: "15px" }}>
          <Link to="/products">Products</Link> |{" "}
          <Link to="/cart">Cart</Link> |{" "}
          <Link to="/checkout">Checkout</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
