const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');
const { obtenerEstadisticas } = require('./controllers/incidenciasController');
 
const app = express();
const PORT = 3000;
 

app.use(express.json());
 
// rutas
app.use('/incidencias', incidenciasRoutes);
app.get('/estadisticas', obtenerEstadisticas);
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 
module.exports = app;