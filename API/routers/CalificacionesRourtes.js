const express = require('express');
const router = express.Router();
const Calificaciones = require('../models/Calificaciones'); 

router.post('/', async (req, res) => {
  try {
    const datosCalificaciones = new Calificaciones(req.body);
    await datosCalificaciones.save();
    res.status(201).json(datosCalificaciones);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const listaDatos = await Calificaciones.find();
  res.json(listaDatos);
});

router.get('/:id', async(req, res) =>{
        const listaDatos = await Calificaciones.findOne({id: req.params.id});
        if (listaDatos) {
            res.json(listaDatos);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);

router.get('/aprobado-notas/:nombre', async (req, res) => {
  try {
    const nombreBuscado = req.params.nombre;

    const datos = await Calificaciones.findOne({ nombre: nombreBuscado });

    if (!datos) return res.status(404).json({ mensaje: 'Estudiante no encontrado.' });

    const notasAprobadas = {};

    if (datos.notaMatematicas >= 70) notasAprobadas.Matematicas = datos.notaMatematicas;
    if (datos.notaCiencias >= 70) notasAprobadas.Ciencias = datos.notaCiencias;
    if (datos.notaLiteratura >= 70) notasAprobadas.Literatura = datos.notaLiteratura;
    if (datos.notaCivica >= 70) notasAprobadas.Civica = datos.notaCivica;

    if (Object.keys(notasAprobadas).length === 0) {
      return res.status(404).json({ mensaje: 'No tiene notas aprobadas.' });
    }

    res.json({
      estudiante: datos.nombre,
      notasAprobadas
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/buscar-por-nombre/:nombre/cuatrimestre/:cuatri', async (req, res) => {
  try {
    const nombreIngresado = req.params.nombre.trim(); 
    const cuatrimestre = parseInt(req.params.cuatri);

    const regex = new RegExp(`^${nombreIngresado}(\\s|$)`, 'i');

    const resultado = await Calificaciones.find({
      nombre: { $regex: regex },
      cuatrimestre: cuatrimestre
    });

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para ese nombre y cuatrimestre.' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/civica-ampliacion', async (req, res) => {
  try {
    const resultado = await Calificaciones.find({
      notaCivica: { $gte: 60, $lt: 70 },
      condicion: 'Ampliación'
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
    const nombre = req.params.nombre;
    const cuatri = parseInt(req.params.cuatri);

    const estudiante = await Calificaciones.findOne({
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      cuatrimestre: cuatri
    });

    if (!estudiante) {
      return res.status(404).json({
        error: `No se encontraron datos para '${nombre}' en el cuatrimestre ${cuatri}.`
      });
    }
    const notas = {
      Matemáticas: estudiante.notaMatematicas ?? 0,
      Ciencias: estudiante.notaCiencias ?? 0,
      Literatura: estudiante.notaLiteratura ?? 0,
      Cívica: estudiante.notaCivica ?? 0
    };

    const materiaMasAlta = Object.keys(notas).reduce((a, b) =>
      notas[a] > notas[b] ? a : b
    );

    res.json({
      estudiante: estudiante.nombre,
      cuatrimestre: estudiante.cuatrimestre,
      materiaConNotaMasAlta: materiaMasAlta,
      nota: notas[materiaMasAlta]
    });

  } catch (error) {
    console.error('Error al obtener la nota más alta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});




router.delete('/:id', async (req, res) => {
  const dato = await Calificaciones.findOneAndDelete({ id: req.params.id });
  if (dato) {
    res.status(200).json({ mensaje: "El elemento fue eliminado" });
  } else {
    res.status(404).json({ error: "No se encontró el elemento" });
  }
});

module.exports = router;
