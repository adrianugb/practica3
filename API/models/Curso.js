//Definimos la entidad
//?????
//id, nombre, descripcion, estado 
//Declaracion de libreria
const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema(
    {
        //id: { type: Number, required: true, unique: true},
        id: { type: Number},
        nombre: { type: String},
        descripcion: { type: String},
        estado: { type: String}
    }
);


module.exports = mongoose.model('Curso', CursoSchema);
