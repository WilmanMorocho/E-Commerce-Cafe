const Product = require('../models/products'); // Cambiar la importación

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    console.log('=== OBTENIENDO PRODUCTOS (PostgreSQL) ===');
    const products = await Product.findAll(); // Cambiar de .find() a .findAll()
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
    console.log('=== CREANDO PRODUCTO (PostgreSQL) ===');
    console.log('Datos recibidos:', req.body);
    
    const { name, description, price, stock, category, image } = req.body;
    
    if (!name || !description || !price || stock === undefined) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        received: req.body 
      });
    }
    
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      category: category || 'coffee',
      image: image || 'assets/default-coffee.jpg'
    });
    
    console.log('Producto creado con éxito:', product.toJSON());
    res.status(201).json(product);
  } catch (error) {
    console.error('Error completo:', error);
    res.status(400).json({ 
      message: error.message
    });
  }
};

// Obtener un producto por ID
const getProduct = async (req, res) => {
  try {
    console.log(`Solicitando producto con ID: ${req.params.id}`);
    const product = await Product.findByPk(req.params.id);
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
    
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      console.log('Producto actualizado con éxito');
      res.status(200).json(updatedProduct);
    } else {
      console.log('Producto no encontrado para actualizar');
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    console.log(`Eliminando producto con ID: ${req.params.id}`);
    
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      console.log('Producto eliminado con éxito');
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      console.log('Producto no encontrado para eliminar');
      res.status(404).json({ message: 'Producto no encontrado' });
    }
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