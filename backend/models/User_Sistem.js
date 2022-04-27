const { DataTypes} = require ('sequelize')

const db = require('../db/conn')

// Tabela no banco
const User_Sistem = db.define('User_Sistem', {
    admin: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    },
    ativo: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    },
    permission: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
})

// Exports module
module.exports = User_Sistem