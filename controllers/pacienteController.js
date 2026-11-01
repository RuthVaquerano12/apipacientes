// importando el modelo de Paciente
const Paciente = require('../models/Paciente');

// Funcion para traer todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion para crear un paciente
exports.addPaciente = async (req, res) => {
    const { nombre } = req.body;
    const paciente = new Paciente({ nombre });
    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Funcion para actualizar un paciente
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const paciente = await Paciente.findByIdAndUpdate(id, { nombre }, { new: true });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }else{
            res.status(200).json(paciente);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Funcion para eliminar un paciente
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByIdAndDelete(id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }else{
            res.status(200).json({ message: 'Paciente eliminado correctamente' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};