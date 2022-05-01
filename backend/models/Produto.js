const { DataTypes} = require ('sequelize')

const db = require('../db/conn')
const Stock = require('./Stock')

// Tabela no banco
const Produto = db.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
    codigo: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    description: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    categoria: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    data_producao: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
    data_validade: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
})



// Exports module
module.exports = Produto