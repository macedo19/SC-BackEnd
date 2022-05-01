const Sale = require('../models/Sale')
const Sale_Product = require('../models/Sale_Product')
const Produto = require('../models/Produto')
const Sale_Client = require('../models/Sale_Client')

const { Op } = require('sequelize')
const sequelize = require('../db/conn')

exports.includeSale =  async (req, res) =>{
    let {quantidade, data_venda, produtos, quantidade_produt, client} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        quantidade = req.body.quantidade
        data_venda = req.body.data_venda
        produtos = req.body.produto
        quantidade_produt = req.body.quantidade_produto
        client = req.body.cliente
    }else{
        quantidade = req.query.quantidade
        data_venda = req.query.data_venda
        produtos = req.query.produto
        quantidade_produt = req.query.quantidade_produto
        client = req.query.cliente
    }

    // Gera nota do serviço de maneira randomica
    let nota_servico = ""
    nota_servico = gerarNF()

    // Dados para venda
    let data = {
        nota_servico,
        quantidade,
        data_venda
    }

    try{

        // Realiza a venda
        const servico = await Sale.create(data)

        let produto =  produtos.split(',');
        let qtde_prod =  quantidade_produt.split(',');
      
        // Insert na tabela de Venda do Produt
        produto.forEach(function(prod, i) {
            let data_venda = {
                quantidade : qtde_prod[i],
                Produto_Id: prod,
                Venda_Id: servico.id
            }
            Sale_Product.create(data_venda)

        })

        // Insert na tabela da venda relacionada ao client
        let data_client = {
            Client : client,
            Venda:  servico.id
        }

        Sale_Client.create(data_client)

        res.status(200).json(servico)
    }catch(error){
        console.log("O erro : " + error)
    }
    console.log(nota_servico)
   
}

function gerarNF(){
    let nota = "NF"
    const characters ='0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        nota += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return nota
}

// Get nota fiscal
exports.getSaleNf = async (req, res) => {
    let nf = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.params) != JSON.stringify({})){
        nf = req.params.nf;
    }else{
        nf = req.query.nf;
    }

    try{

        let sale = await sequelize.query("SELECT sp.quantidade, produto.codigo, produto.description,produto.categoria,produto.data_validade, sale.nota_servico,client.name,client.empresa FROM projeto.sale_products AS sp LEFT JOIN projeto.produtos AS produto ON produto.id = sp.Produto_Id LEFT JOIN projeto.sales AS sale ON sale.id = sp.Venda_Id LEFT JOIN projeto.sale_clients as sc ON sc.Venda = sale.id LEFT JOIN projeto.clientes as client ON client.id = sc.Client WHERE sale.nota_servico = '" + nf + "' GROUP BY sale.id, produto.codigo")
        
        res.status(200).json(sale)

    }catch(error){
        console.log("Erro : " + error)
    }
}

// Gera todas as notas
exports.getSaleAll = async (req, res) => {

    try{

        // Bate duas vezes o laza
        let sale = await sequelize.query("SELECT sp.quantidade, produto.codigo, produto.description,produto.categoria,produto.data_validade, sale.nota_servico,client.name,client.empresa FROM projeto.sale_products AS sp LEFT JOIN projeto.produtos AS produto ON produto.id = sp.Produto_Id LEFT JOIN projeto.sales AS sale ON sale.id = sp.Venda_Id LEFT JOIN projeto.sale_clients as sc ON sc.Venda = sale.id LEFT JOIN projeto.clientes as client ON client.id = sc.Client  GROUP BY sale.id, produto.codigo")
        
        res.status(200).json(sale)

    }catch(error){
        console.log("Erro : " + error)
    }
}