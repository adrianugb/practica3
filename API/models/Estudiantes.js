const mongoose = require('mongoose');

const CalificacionesSchema = new mongoose.Schema(
    {
        //id: { type: Number, required: true, unique: true},
        id: { type: Number},
        nombre: {
        type: String,
        required: true,
        match: [
        /^([A-Za-zÁÉÍÓÚáéíóúÑñ]+ ){3}[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
        'El nombre debe tener dos nombres y dos apellidos, sin números ni símbolos.'
        ]
    },
        cuatrimestre: {
            type: Number,
            required: true,
            index: true
    },
        notaMatematicas: {
            type: Number,
            required: true
    },
        notaCiencias: {
            type: Number,
            required: true
    },
        notaLiteratura: {
            type: Number,
            required: true
    },
        notaCivica: {
            type: Number,
            required: true
    },
        condicion: {
            type: String,
            enum: ['Aprobado', 'Ampliación', 'Reprobado'],
            required: true
    }
    });


module.exports = mongoose.model('Calificaciones', CalificacionesSchema, 'calificaciones');