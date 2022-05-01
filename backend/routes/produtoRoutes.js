const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')

// localhost:3000/produtos/

// Cria produtos (Ok)
router.post('/criar', ProdutoController.createProduct)

// Get todos produtos (Ok)
router.get('/products', ProdutoController.getAllProduts)

// Get unico produo (Ex: localhost:3000/produtos/getproduto/2)
router.get('/getproduto/:id', ProdutoController.getByIdProduct)

// Get produtos por codigo
router.get('/getproduto/:codigo', ProdutoController.getByCodigoProduct)

// Atualizar produto
router.post('/atualizaprod', ProdutoController.updateProdSave)

// Produtos validade expirada
router.get('/produtovalid', ProdutoController.getProductValid)

module.exports = router