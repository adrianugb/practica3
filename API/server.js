const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const RouterCurso = require('./routers/CursoRourtes');
const RouterEstudiantes = require('./routers/EstudiantesRourtes');
const RouterSede = require('./routers/SedeRourtes');
const RouterProfesores = require('./routers/ProfesoresRourtes');

const cors = require('cors');
const app = express();
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/academias',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
app.use(bodyParse.json());

app.use('/api/cursos', RouterCurso)
app.use('/api/estudiantes', RouterEstudiantes)
app.use('/api/sedes', RouterSede)
app.use('/api/profesores', RouterProfesores)

app.listen(PORT, ()=> {
        //version old
        //console.log('Servidor corriendo http://localhost:'+PORT);
        //version new
        console.log(`Servidor corriendo http://localhost:${PORT}`);

    }
)
