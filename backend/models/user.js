// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Por favor ingresa el nombre completo'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor ingresa el email'],
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: [true, 'Por favor ingresa el nombre de usuario'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Por favor ingresa la contraseña'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  role: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  }
}, {
  timestamps: true
});

// Logging para debug
userSchema.pre('save', function(next) {
  console.log('=== GUARDANDO USUARIO ===');
  console.log('Datos:', this.toObject());
  next();
});

userSchema.post('save', function(doc) {
  console.log('Usuario guardado exitosamente:', doc._id);
});

module.exports = mongoose.model('User', userSchema);