const express = require('express');
const router = express.Router();
const Profesores = require('../models/Profesores');

router.post('/', async (req, res) => {
        try {
            const datosProfesores = new Profesores(req.body);
            await datosProfesores.save();
            res.status(201).json(datosProfesores);
            
        } catch (err) {
            res.status(400).json({error: err.message });
        }
    }
);

router.get('/', async(req, res) =>{
        const listaDatos = await Profesores.find();
        res.json(listaDatos);


    }
);
router.get('/:id', async(req, res) =>{
        const listaDatos = await Profesores.findOne({id: req.params.id});
        if (listaDatos) {
            res.json(listaDatos);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);


router.put('/:id', async(req, res) =>{
        const dato = await Profesores.findOneAndUpdate({
                id: req.params.id}, req.body, {new: true                
            });
        if (dato){
            res.json(dato);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento para actualizar"});
        }
    }
);
//Obtener 
router.delete('/:id', async(req, res) =>{
        const dato = await Profesores.findOneAndDelete({id: req.params.id});
        if (dato) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);
module.exports = router;