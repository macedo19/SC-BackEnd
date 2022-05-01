const { DataTypes} = require ('sequelize')

const db = require('../db/conn')
const User = require('./User')

// Tabela no banco
const Permissions = db.define('Permissions', {
    modulo: {
        type: DataTypes.STRING,//tipo string
        require: true//Não aceita valores vazios
    }
})

// // Um pensamento esta relacionado a um usuário
Permissions.belongsTo(User, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
User.hasMany(Permissions,{ foreignKey: 'UsuarioId'})

// Exports module
module.exports = Permissions