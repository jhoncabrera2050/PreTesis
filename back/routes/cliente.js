'use strict'
var express = require('express');
var clientecontroller = require('../controllers/clienteController');
var api = express.Router();
api.post('/registro_cliente', clientecontroller.registro_cliente);
api.post('/login_cliente', clientecontroller.login_cliente);
module.exports = api;