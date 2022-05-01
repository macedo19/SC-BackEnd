const { DataTypes} = require ('sequelize')

const db = require('../db/conn')
const Cliente = require('./Cliente')

// Tabela no banco
const Sale = db.define('Sale', {
    nota_servico: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    quantidade: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    },
    data_venda: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
})

// Exports module
module.exports = Sale