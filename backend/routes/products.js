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