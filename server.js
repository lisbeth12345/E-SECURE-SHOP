// server.js
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51S6Gk0152kHuy98aCMaa6BVk1n4cKV7Bcs931JhMHPxCCVHlbiOJdIVRFoCyqQkjIVpfrYWGH1pd7kn91uNk45VB00YOY6LgqI'); // tu Secret Key

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

app.post('/api/pago', (req, res) => {
  res.json({ success: true, message: 'Pago simulado con éxito' });
});

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body; 

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name, images: [item.image] },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://e-secure-shop.onrender.com/success.html',
      cancel_url: 'https://e-secure-shop.onrender.com/cancel.html',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



