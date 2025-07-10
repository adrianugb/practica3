const mongoose = require('mongoose');

const ProfesoresSchema = new mongoose.Schema(
    {
        //id: { type: Number, required: true, unique: true},
        id: { type: Number},
        nombre: { type: String},
        especialidad: { type: String},
	    correo: { type: String},
        estado: { type: String}
    }
);


module.exports = mongoose.model('Profesores', ProfesoresSchema);