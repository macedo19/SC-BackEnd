const Produto = require('../models/Produto')

const { Op } = require('sequelize')

// CONTROLLER DE REFERENCIA PARA INTEGRAR COM ANGULAR


// Include Produtos
exports.createProduct = async (req, res) => {

    let {codigo, description, categoria, data_producao, data_validade} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        codigo = req.body.codigo
        description = req.body.description
        categoria = req.body.categoria
        data_producao = req.body.data_producao
        data_validade = req.body.data_validade
    }else{
        codigo = req.query.codigo
        description = req.query.description
        categoria = req.query.categoria
        data_producao = req.query.data_producao
        data_validade = req.query.data_validade

    }

    const data = {
        codigo,
        description,
        categoria,
        data_producao,
        data_validade
    }

    console.log(data)
    try{

        const repost = await Produto.create(data)
        res.status(201).json(repost)

    }catch(error){
        console.log(error)
    }

}

 
// Get Produtos
exports.getAllProduts = async (req, res, next) => {
  
    const products = await Produto.findAll({ raw: true})

    res.status(200).json(products)
}

// Editar um produto
exports.getByIdProduct = async (req, res, next) => {

    let id = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.params) != JSON.stringify({})){
        id = req.params.id;
    }else{
        id = req.query.id;
    }

    const prod = await Produto.findOne({where : {id : id}})

    console.log(prod)
    res.status(200).json(prod)
}

// Buscar um produto
exports.getByCodigoProduct = async (req, res, next) => {
    const codigo = req.params.codigo;
    const resp = await Produto.findOne({where : {codigo : codigo}})

    res.status(200).json(resp)
}

// Atualizar um produto
exports.updateProdSave = async (req, res, next) => {
  
    let {codigo, description, categoria, data_producao, data_validade,id } = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        codigo = req.body.codigo
        description = req.body.description
        categoria = req.body.categoria
        data_producao = req.body.data_producao
        data_validade = req.body.data_validade
        id = req.body.id
    }else{
        codigo = req.query.codigo
        description = req.query.description
        categoria = req.query.categoria
        data_producao = req.query.data_producao
        data_validade = req.query.data_validade
        id = req.query.id

    }

    const data = {
        codigo,
        description,
        categoria,
        data_producao,
        data_validade
    }

    try {

        const updateProd = await Produto.update(data, {where: {id : id}})

        res.status(200).json(updateProd)
    

    }catch(error){
        console.log(error)
    }
}

// Atualizar um produto
exports.getProductValid = async (req, res, next) => {

    const date = new Date().toISOString()
    console.log(date)
    const updateProd = await Produto.findAll( {
        where: { data_validade : {
            [Op.lt]: date
        }}
    })


    res.status(200).json(updateProd)
}