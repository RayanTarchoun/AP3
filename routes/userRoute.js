const express = require('express');
const { signup, login } = require('./userController');

const router = express.Router();

// Route pour s'inscrire
router.post('/signup', signup);

// Route pour se connecter
router.post('/login', login);

module.exports = router;
