const express = require('express')
const router = express.Router()
const SaleController = require('../controllers/SaleController')

// localhost:3000/clientes/

// Cadastrar Venda (Ok)
router.post('/cadastrovenda', SaleController.includeSale )

// Busca Venda pela nota de servico
router.get('/vendasnf/:nf', SaleController.getSaleNf)

// Get todas as vendas
router.get('/vendasall', SaleController.getSaleAll)

// Listar clientes com quantidade de compras

module.exports = router