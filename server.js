const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();
//configuraciones servidor http
app.use(bodyParser.json());
app.use(cors());

// conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

//Rutas de la API
//Rutas para auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);


//configurar puerto para back
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});