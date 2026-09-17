const { PRIORIDADES_VALIDAS, ESTADOS_VALIDOS } = require('../utils/helpers');


const incidencias = [];
let nextId = 1;

// ===================== PERSONA 1 =====================
function registrarIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  if (!empleado || !area || !descripcion || !prioridad) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  if (
    empleado.trim() === '' ||
    area.trim() === '' ||
    descripcion.trim() === '' ||
    prioridad.trim() === ''
  ) {
    return res.status(400).json({ mensaje: 'No se permiten cadenas vacías' });
  }

  if (!PRIORIDADES_VALIDAS.includes(prioridad)) {
    return res.status(400).json({ mensaje: 'Prioridad inválida. Debe ser Alta, Media o Baja' });
  }

  const nuevaIncidencia = {
    id: nextId++,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad,
    estado: 'Pendiente',
  };

  incidencias.push(nuevaIncidencia);

  return res.status(201).json({ mensaje: 'Incidencia registrada correctamente' });
}

// ===================== PERSONA 2 =====================
function listarIncidencias(req, res) {

}

function buscarIncidenciaPorId(req, res) {
  

}

function cambiarEstado(req, res) {

}

// ===================== PERSONA 3 =====================
function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);

  const indice = incidencias.findIndex(incidencia => incidencia.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: 'Incidencia no encontrada'
    });
  }

  const incidenciaEliminada = incidencias.splice(indice, 1);

  return res.status(200).json({
    mensaje: 'Incidencia eliminada correctamente',
    incidencia: incidenciaEliminada[0]
  });
}

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidenciaPorId,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia,
};