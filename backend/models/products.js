// backend/models/Product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Por favor ingresa el nombre del producto' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Por favor ingresa una descripción' }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'El precio debe ser positivo' }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'El stock no puede ser negativo' }
    }
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'coffee'
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'assets/default-coffee.jpg'
  }
}, {
  timestamps: true,
  tableName: 'products'
});

module.exports = Product;