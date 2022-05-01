const { DataTypes} = require ('sequelize')

const db = require('../db/conn')

// Tabela no banco
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
    name: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    email: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
    password: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    },
})

// Exports module
module.exports = User