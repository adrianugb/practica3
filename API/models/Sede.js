const mongoose = require('mongoose');

const SedeSchema = new mongoose.Schema(
    {
        //id: { type: Number, required: true, unique: true},
        id: { type: Number},
        nombre: { type: String},
        descripcion: { type: String},
        correo: { type: String},
        estado: { type: String}
    }
);


module.exports = mongoose.model('Sede', SedeSchema);