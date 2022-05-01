const { DataTypes} = require ('sequelize')
const Produto = require('./Produto')
const db = require('../db/conn')

// Tabela no banco
const Stock = db.define('Stock', {
    nota_servico: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },

    quantidade: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    },
    date_entrada: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
    data_saida: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
    
})


// // RELACIONAMENTO 
// // ---------------------------------------------------
// // Um pensamento esta relacionado a um usuário
Stock.belongsTo(Produto, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
Produto.hasMany(Stock,{ foreignKey: 'produtoId'})

// Estoque.hasMany(Produto)
// // Exports module
module.exports = Stock

// https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554