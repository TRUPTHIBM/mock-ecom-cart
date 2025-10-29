require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const products = [
  { id: 'p1', name: 'Vibe Tee', price: 299 },
  { id: 'p2', name: 'Vibe Hoodie', price: 899 },
  { id: 'p3', name: 'Vibe Cap', price: 199 },
  { id: 'p4', name: 'Vibe Jeans', price: 1299 },
  { id: 'p5', name: 'Vibe Sneakers', price: 2499 }
];

let cart = [];

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/cart', (req, res) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ items: cart, total });
});

app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const existing = cart.find(c => c.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: Date.now().toString(), productId, name: product.name, price: product.price, qty });
  res.json({ message: 'Added', cart });
});

app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter(c => c.id !== req.params.id);
  res.json({ message: 'Removed', cart });
});

app.post('/api/cart/checkout', (req, res) => {
  const { name, email } = req.body;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const receipt = { id: Date.now().toString(), name, email, total, timestamp: new Date().toISOString() };
  cart = [];
  res.json(receipt);
});

app.get('/', (req, res) => {
  res.send('Backend is working ✅');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

