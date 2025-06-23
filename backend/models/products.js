// backend/models/products.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingresa el nombre del producto'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Por favor ingresa una descripción'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Por favor ingresa el precio'],
    min: [0, 'El precio debe ser positivo']
  },
  stock: {
    type: Number,
    required: [true, 'Por favor ingresa la cantidad en stock'],
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  category: {
    type: String,
    default: 'coffee'
  },
  image: {
    type: String,
    default: 'assets/default-coffee.jpg'
  }
}, {
  timestamps: true
});

// Agregar logging para debug
productSchema.pre('save', function(next) {
  console.log('Guardando producto:', this.toObject());
  next();
});

productSchema.post('save', function(doc) {
  console.log('Producto guardado exitosamente:', doc._id);
});

module.exports = mongoose.model('Product', productSchema);

// backend/routes/products.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Obtener todos los productos
router.get('/', getProducts);

// @route   POST /api/products
// @desc    Crear nuevo producto
router.post('/', createProduct);

// @route   GET /api/products/:id
// @desc    Obtener producto por ID
router.get('/:id', getProduct);

// @route   PUT /api/products/:id
// @desc    Actualizar producto
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Eliminar producto
router.delete('/:id', deleteProduct);

module.exports = router;