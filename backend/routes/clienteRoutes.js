const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/ClienteController')

// localhost:3000/clientes/

// Cadastrar cliente
router.post('/cadastrocliente', ClienteController.createClient)

// Atualizar cliente
router.post('/updateClient', ClienteController.updateClient)

// Listar Clientes
router.get('/clients', ClienteController.getAllClients)

// Listar clientes com quantidade de compras

module.exports = router