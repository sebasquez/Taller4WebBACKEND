'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var personaController = require('../controllers/personaController');
 
// Llamamos al router
var api = express.Router();
 
// Creamos una ruta de tipo GET para el método de pruebas
api.post('/persona', personaController.guardar);
api.get('/persona', personaController.buscar);
api.get('/personaID/:id', personaController.buscarid);
//api.post('/api/persona',personaController.persona);

// Exportamos la configuración
module.exports = api;
