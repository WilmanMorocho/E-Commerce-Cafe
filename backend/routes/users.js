// backend/routes/users.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser
} = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Registrar nuevo usuario
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Login de usuario
router.post('/login', loginUser);

// @route   GET /api/users
// @desc    Obtener todos los usuarios (solo admin)
router.get('/', getUsers);

// @route   DELETE /api/users/:username
// @desc    Eliminar usuario por username
router.delete('/:username', deleteUser);

module.exports = router;