const Product = require('../models/products');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    console.log('=== OBTENIENDO PRODUCTOS ===');
    const products = await Product.find();
    console.log(`Productos encontrados: ${products.length}`);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error en getProducts:', error);
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    console.log('=== CREANDO PRODUCTO ===');
    console.log('Datos recibidos:', req.body);
    console.log('Headers:', req.headers);
    
    const { name, description, price, stock } = req.body;
    
    // Validación adicional
    if (!name || !description || !price || stock === undefined) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        received: req.body 
      });
    }
    
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      stock: parseInt(stock)
    };
    
    console.log('Datos procesados:', productData);
    
    const product = await Product.create(productData);
    console.log('Producto creado con éxito:', product);
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error completo:', error);
    res.status(400).json({ 
      message: error.message,
      stack: error.stack 
    });
  }
};

// Obtener un producto por ID
const getProduct = async (req, res) => {
  try {
    console.log(`Solicitando producto con ID: ${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Producto no encontrado');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error en getProduct:', error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    console.log(`Actualizando producto con ID: ${req.params.id}`, req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      console.log('Producto no encontrado para actualizar');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    console.log('Producto actualizado con éxito');
    res.status(200).json(product);
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    console.log(`Eliminando producto con ID: ${req.params.id}`);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log('Producto no encontrado para eliminar');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    console.log('Producto eliminado con éxito');
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};