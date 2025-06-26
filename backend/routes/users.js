const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.delete('/:username', deleteUser);

module.exports = router;