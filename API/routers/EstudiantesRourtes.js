
const express = require('express');
const router = express.Router();
const Estudiantes = require('../models/Estudiantes');

router.post('/', async (req, res) => {
        try {
            const datosEstudiantes = new Estudiantes(req.body);
            await datosEstudiantes.save();
            res.status(201).json(datosEstudiantes);
            
        } catch (err) {
            res.status(400).json({error: err.message });
        }
    }
);

router.get('/', async(req, res) =>{
        const listaDatos = await Estudiantes.find();
        res.json(listaDatos);


    }
);
router.get('/:id', async(req, res) =>{
        const listaDatos = await Estudiantes.findOne({id: req.params.id});
        if (listaDatos) {
            res.json(listaDatos);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);

router.get('/aprobado/:nombre', async (req, res) => {
  try {
    const resultado = await Calificaciones.find({
      nombre: req.params.nombre,
      condicion: 'Aprobado'
    });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/buscar-por-nombre/:nombre/cuatrimestre/:cuatri', async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.nombre}\\s`, 'i'); 
    const resultado = await Calificaciones.find({
      nombre: regex,
      cuatrimestre: parseInt(req.params.cuatri)
    });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/civica-ampliacion', async (req, res) => {
  try {
    const resultado = await Calificaciones.find({
      notaCivica: { $gte: 60, $lt: 70 }
    });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/promedios/cuatrimestre/:cuatri', async (req, res) => {
  try {
    const cuatri = parseInt(req.params.cuatri);
    const resultado = await Calificaciones.aggregate([
      { $match: { cuatrimestre: cuatri } },
      {
        $group: {
          _id: null,
          promedioMatematicas: { $avg: "$notaMatematicas" },
          promedioCiencias: { $avg: "$notaCiencias" },
          promedioLiteratura: { $avg: "$notaLiteratura" },
          promedioCivica: { $avg: "$notaCivica" }
        }
      }
    ]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/nota-mas-alta/:nombre/cuatrimestre/:cuatri', async (req, res) => {
  try {
    const datos = await Calificaciones.findOne({
      nombre: req.params.nombre,
      cuatrimestre: parseInt(req.params.cuatri)
    });

    if (!datos) {
      return res.status(404).json({ error: 'No se encontraron datos' });
    }

    const notas = {
      Matematicas: datos.notaMatematicas,
      Ciencias: datos.notaCiencias,
      Literatura: datos.notaLiteratura,
      Civica: datos.notaCivica
    };

    const materia = Object.keys(notas).reduce((a, b) =>
      notas[a] > notas[b] ? a : b
    );

    res.json({
      estudiante: datos.nombre,
      cuatrimestre: datos.cuatrimestre,
      materiaConNotaMasAlta: materia,
      nota: notas[materia]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async(req, res) =>{
        const dato = await Estudiantes.findOneAndUpdate({
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
        const dato = await Estudiantes.findOneAndDelete({id: req.params.id});
        if (dato) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);
module.exports = router;