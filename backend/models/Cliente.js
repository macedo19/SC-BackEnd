const { DataTypes} = require ('sequelize')

const db = require('../db/conn')

// Tabela no banco
const Cliente = db.define('Cliente', {
    name: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    email: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    },
    empresa: {
        type: DataTypes.DATE,//tipo string
        require: true//Não aceita valores vazios
    },
})

// Exports module
module.exports = Cliente