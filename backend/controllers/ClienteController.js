
// Fazer requie das models a serem utilizadas
const User = require('../models/User')

const Cliente = require('../models/Cliente')

// Operacao sequeliza
const { Op} =require('sequelize')
const { raw } = require('express')


// Adiciona cliente na base
exports.createClient = async (req, res) => {
    let {name, email, empresa} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        name = req.body.name
        email = req.body.email
        empresa = req.body.empresa
    }else{
        name = req.query.name
        email = req.query.email
        empresa = req.query.empresa

    }

    const data = {
        name : name,
        email : email,
        empresa : empresa
    }

    console.log(data)
    try{
        
        const client = await Cliente.create(data)

        res.status(200).json(client)
    }catch(error){
        console.log(error)
    }
}

// Get Clientes
exports.getAllClients = async (req, res) => {
    const clients = await Cliente.findAll({raw: true})

    res.status(200).json(clients)
}

// Update Cliente
exports.updateClient = async (req, res) => {
    let {name, email, empresa, clienteid} = ""

    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        name = req.body.name
        email = req.body.email
        empresa = req.body.empresa
        clienteid = req.body.id
    }else{
        name = req.query.name
        email = req.query.email
        empresa = req.query.empresa
        clienteid = req.query.id
}

    const data = {
        name : name,
        email: email,
        empresa: empresa
    }

    try{
        const clientUpdate = Cliente.update(data, {
            where: {id : clienteid}
        })

        res.status(200).json(clientUpdate)
    }catch(error){
        console.log(error)
    }
}