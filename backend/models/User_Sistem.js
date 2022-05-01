const { DataTypes} = require ('sequelize')

const db = require('../db/conn')
const User = require('./User')

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
})

// // Um pensamento esta relacionado a um usuário
User_Sistem.belongsTo(User, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
User.hasMany(User_Sistem,{ foreignKey: 'Usuario'})

// Exports module
module.exports = User_Sistem