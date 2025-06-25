// backend/controllers/userController.js
const User = require('../models/User');

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    console.log('=== REGISTRANDO USUARIO ===');
    console.log('Datos recibidos:', req.body);
    
    const { fullname, email, username, password, role } = req.body;
    
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        received: req.body 
      });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { email },
          { username }
        ]
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Usuario o email ya existe' 
      });
    }
    
    const user = await User.create({
      fullname: fullname.trim(),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password: password, // En producción, hashear la contraseña
      role: role || 'cliente'
    });
    
    console.log('Usuario creado con éxito:', user.toJSON());
    
    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error('Error completo:', error);
    res.status(400).json({ 
      message: error.message
    });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  try {
    console.log('=== LOGIN USUARIO ===');
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username y password son requeridos' 
      });
    }
    
    const user = await User.findOne({ where: { username } });
    
    if (user && user.password === password) {
      res.json({
        id: user.id,
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
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: { username: req.params.username }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
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