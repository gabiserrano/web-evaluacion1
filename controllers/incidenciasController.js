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
  return res.status(200).json(incidencias);
}

function buscarIncidenciaPorId(req, res) {
  const id = parseInt(req.params.id);
  const incidencia = incidencias.find((i) => i.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  return res.status(200).json(incidencia);
}

function cambiarEstado(req, res) {
  const id = parseInt(req.params.id);
  const { estado } = req.body;

  const incidencia = incidencias.find((i) => i.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({ mensaje: 'El estado es obligatorio' });
  }

  switch (estado) {
    case 'Pendiente':
      incidencia.estado = 'Pendiente';
      break;

    case 'En Proceso':
      incidencia.estado = 'En Proceso';
      break;

    case 'Resuelta':
      incidencia.estado = 'Resuelta';
      break;

    case 'Cancelada':
      incidencia.estado = 'Cancelada';
      break;

    default:
      return res.status(400).json({ mensaje: 'Estado inválido. Debe ser Pendiente, En Proceso, Resuelta o Cancelada' });
  }

  return res.status(200).json({ mensaje: 'Estado de la incidencia actualizado correctamente' , incidencia });
}

// ===================== PERSONA 3 =====================
function eliminarIncidencia(req, res) {

}

function obtenerEstadisticas(req, res) {

}

function clasificarIncidencia(req, res) {

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