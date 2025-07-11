const express = require('express');
//mongoose aca usa todas las funciones
const mongoose = require('mongoose');
//Formateo de los datos
const bodyParse = require('body-parser');

const RouterCurso = require('./routers/CursoRourtes');
const RouterEstudiantes = require('./routers/EstudiantesRourtes');
const RouterSede = require('./routers/SedeRourtes');
const RouterProfesores = require('./routers/ProfesoresRourtes');

const cors = require('cors');
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

app.use('/api/cursos', RouterCurso)
app.use('/api/estudiantes', RouterEstudiantes)
app.use('/api/sedes', RouterSede)
app.use('/api/profesores', RouterProfesores)


//Ocupamos el servidor funcional
app.listen(PORT, ()=> {
        //version old
        //console.log('Servidor corriendo http://localhost:'+PORT);
        //version new
        console.log(`Servidor corriendo http://localhost:${PORT}`);

    }
)
