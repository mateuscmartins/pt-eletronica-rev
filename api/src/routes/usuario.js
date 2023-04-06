const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario');

router.post('/usuario', usuarioController.usuario);

module.exports = router;