// src/api.js
import API_URL from "./config";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  });
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_URL}/api/cart`);
  return res.json();
}

export async function removeCartItem(id) {
  const res = await fetch(`${API_URL}/api/cart/${id}`, { method: "DELETE" });
  return res.json();
}

export async function checkout(cartItems, name, email) {
  const res = await fetch(`${API_URL}/api/cart/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems, name, email })
  });
  return res.json();
}
