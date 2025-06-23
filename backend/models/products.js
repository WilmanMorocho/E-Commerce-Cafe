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