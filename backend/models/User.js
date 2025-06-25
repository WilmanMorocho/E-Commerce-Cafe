const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Por favor ingresa el nombre completo"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Por favor ingresa el email"],
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: [true, "Por favor ingresa el nombre de usuario"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Por favor ingresa la contraseña"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  },
  role: {
    type: String,
    enum: ["cliente", "admin"],
    default: "cliente"
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);