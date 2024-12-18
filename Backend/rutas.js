const express = require('express');
const router = express.Router();
const controlador = require('./controladores');

router.post('/productos/registrar', controlador.regProd);
router.post('/productos/consultar', controlador.consProd);
router.post('/productos/eliminar/id', controlador.elimProdId);
router.get('/productos/consultar/todos', controlador.consProdAll)
router.post('/productos/editar', controlador.editProd);

module.exports = router;