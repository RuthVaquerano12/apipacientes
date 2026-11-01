const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { register } = require('../controllers/authController'); // Importamos la función register que creaste

const router = express.Router();

// 1. Tu ruta de login que ya tenías
router.post('/login', async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });

    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esCoincidente) {
        return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'çlaveSecreta', { expiresIn: '1h' });
    res.json({ token });
});

// 2. Agregamos la ruta de registro usando el controlador
router.post('/register', register);

module.exports = router;