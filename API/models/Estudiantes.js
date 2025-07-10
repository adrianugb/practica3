const mongoose = require('mongoose');

const EstudiantesSchema = new mongoose.Schema(
    {
        //id: { type: Number, required: true, unique: true},
        id: { type: Number},
        nombre: { type: String},
        carrera: { type: String},
        cuatrimestre: { type: String},
	    correo: { type: String},
        estado: { type: String}
    }
);


module.exports = mongoose.model('Estudiantes', EstudiantesSchema);