const { DataTypes} = require ('sequelize')

const db = require('../db/conn')

// Tabela no banco
const Produto = db.define('Produto', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
    data_produção: {
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