const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Función de Login
const login = async (req, res) => {
    try {
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
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// Función de Registro (la que ya tenías)
const register = async (req, res) => {
    try {
        const { nombreUsuario, contraseña, rol } = req.body;
        const usuarioExistente = await Usuario.findOne({ nombreUsuario });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // NOTA: Si en tu registro quieres que la contraseña se guarde encriptada con bcrypt, 
        // puedes descomentar estas líneas:
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(contraseña, salt);
        // Y pasar 'hashedPassword' en lugar de 'contraseña' al crear el nuevo usuario.

        const nuevoUsuario = new Usuario({ nombreUsuario, contraseña, rol });
        await nuevoUsuario.save();

        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                nombreUsuario: nuevoUsuario.nombreUsuario,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Exportamos ambas funciones correctamente
module.exports = {
    login,
    register
};