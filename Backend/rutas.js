const express = require('express');
const router = express.Router();
const controlador = require('./controladores');

router.post('/productos/registrar', controlador.regProd );

module.exports = router;