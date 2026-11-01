const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String, required: true
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema);