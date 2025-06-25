const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Por favor ingresa el nombre completo' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Por favor ingresa un email válido' }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Por favor ingresa el nombre de usuario' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [6, 100], msg: 'La contraseña debe tener al menos 6 caracteres' }
    }
  },
  role: {
    type: DataTypes.ENUM('cliente', 'admin'),
    defaultValue: 'cliente'
  },
  address: {
    type: DataTypes.JSONB, // PostgreSQL JSON field
    defaultValue: {}
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'users'
});

module.exports = User;