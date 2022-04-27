const { DataTypes} = require ('sequelize')
const Produto = require('./Produto')
const db = require('../db/conn')

// Tabela no banco
const Estoque = db.define('Estoque', {
    nota_servico: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{model: 'Produto', key: 'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    
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

// RELACIONAMENTO 
// ---------------------------------------------------
// Um pensamento esta relacionado a um usuário
Produto.belongsTo(Estoque)

// Um Usuari tem muitos pensamentos
Estoque.hasMany(Produto)
// Exports module
module.exports = Estoque

// https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554