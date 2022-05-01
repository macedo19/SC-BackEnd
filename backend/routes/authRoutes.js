const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// Rotas
router.get('/login', AuthController.login)

// Rota para validar login
router.post('/login', AuthController.loginPost)

// Rota para reenderizar (Em análise)
router.get('/register', AuthController.register)

// Rota para registrar um usuário -> default Admin (Ok)
router.post('/register', AuthController.registerPost)

// Rota para registrar um usuário restrito (Ok)
router.post('/registerrestrito', AuthController.registerUserRes)

// Rota para atualizar permissionamento do usuário (Ok)
router.post('/userset', AuthController.userSettings)

// Rota para inativar usuário
router.post('/inativa', AuthController.inativaUser)

// Ativa Usuario (Ok)
router.post('/ativauser', AuthController.ativaUser)

// Get usuários restritos (Ok)
router.get('/users', AuthController.getAllUsers)

// Rota para logout (Em análise)
router.get('/logout', AuthController.logout)

module.exports = router