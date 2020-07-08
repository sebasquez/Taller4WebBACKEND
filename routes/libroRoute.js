'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var libroController = require('../controllers/libroController');
 
// Llamamos al router
var api = express.Router();

api.get('/mostrarlibros', libroController.mostrarlibros);
api.get('/buscarlibro', libroController.buscarlibro);
api.post('/guardarlibro', libroController.guardarlibro);
api.get('/libroid/:id', libroController.buscarbyid);
api.put('/libroid/:id', libroController.editar);
api.delete('/libroid/:id', libroController.eliminar);
module.exports = api;
