
//Declaraciones de variables la palabra const es para crear variables unicas
//require es una analogia de importar una libreria
const express = require('express');
//mongoose aca usa todas las funciones
const mongoose = require('mongoose');
//Formateo de los datos
const bodyParse = require('body-parser');

const RouterCurso = require('./routers/CursoRourtes');
const RouterEstudiantes = require('./routers/EstudiantesRourtes');
const RouterSede = require('./routers/SedeRourtes');
const RouterProfesores = require('./routers/ProfesoresRourtes');

//asginas rutas
//variables para el https o web
const cors = require('cors');

//se hace una instancia para que app sea el express
const app = express();
const PORT = 3000;


//Conexion hacia mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/academias',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Middlewares el router del htpp
app.use(cors());
app.use(bodyParse.json());



//Rutas del api
app.use('/api/cursos', RouterCurso)
app.use('/api/estudiantes', RouterEstudiantes)
app.use('/api/sedes', SedeRourtes)
app.use('/api/profesores', ProfesoresRourtes)


//Ocupamos el servidor funcional
app.listen(PORT, ()=> {
        //version old
        //console.log('Servidor corriendo http://localhost:'+PORT);
        //version new
        console.log(`Servidor corriendo http://localhost:${PORT}`);

    }
)
