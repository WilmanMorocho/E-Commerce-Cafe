const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'http://localhost' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

connectDB();

app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando correctamente con PostgreSQL' });
});

app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});