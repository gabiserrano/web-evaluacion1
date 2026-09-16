const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');
 
router.post('/', controller.registrarIncidencia);
 

router.get('/', controller.listarIncidencias);
router.get('/:id', controller.buscarIncidenciaPorId);
router.put('/:id/estado', controller.cambiarEstado);



router.delete('/:id', controller.eliminarIncidencia);
router.get('/:id/clasificacion', controller.clasificarIncidencia);
 
module.exports = router;