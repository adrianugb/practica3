const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const RouterEstudiantes = require('./routers/CalificacionesRourtes');

const cors = require('cors');
const app = express();
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/simulacion2',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
app.use(bodyParse.json());
app.use('/api/calificaciones', RouterEstudiantes)
app.listen(PORT, ()=> {
        //version old
        //console.log('Servidor corriendo http://localhost:'+PORT);
        //version new
        console.log(`Servidor corriendo http://localhost:${PORT}`);

    }
)
