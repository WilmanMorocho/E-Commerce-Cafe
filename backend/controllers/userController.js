// backend/controllers/userController.js
const User = require('../models/User'); // Asegúrate de que sea 'User' con mayúscula

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    console.log('=== REGISTRANDO USUARIO ===');
    console.log('Datos recibidos:', req.body);
    
    const { fullname, email, username, password, role } = req.body;
    
    // Validación
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        received: req.body 
      });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Usuario o email ya existe' 
      });
    }
    
    const userData = {
      fullname: fullname.trim(),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password: password, // En producción, hashear la contraseña
      role: role || 'cliente'
    };
    
    console.log('Datos procesados:', userData);
    
    const user = await User.create(userData);
    console.log('Usuario creado con éxito:', user);
    
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error('Error completo:', error);
    res.status(400).json({ 
      message: error.message,
      stack: error.stack 
    });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  try {
    console.log('=== LOGIN USUARIO ===');
    console.log('Datos recibidos:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username y password son requeridos' 
      });
    }
    
    const user = await User.findOne({ username });
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (user && user.password === password) { // En producción, comparar hash
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    console.log('=== OBTENIENDO USUARIOS ===');
    const users = await User.find().select('-password');
    console.log(`Usuarios encontrados: ${users.length}`);
    res.json(users);
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    console.log(`=== ELIMINANDO USUARIO: ${req.params.username} ===`);
    const user = await User.findOneAndDelete({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    console.log('Usuario eliminado exitosamente');
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error en deleteUser:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser
};