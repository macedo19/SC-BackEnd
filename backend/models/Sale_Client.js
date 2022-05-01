const { DataTypes} = require ('sequelize')
const Produto = require('./Produto')
const Sale = require('./Sale')
const db = require('../db/conn')
const Cliente = require('./Cliente')

// Tabela no banco
const Sale_Client = db.define('Sale_Client', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
})

// // Um pensamento esta relacionado a um usuário
Sale_Client.belongsTo(Cliente, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
Cliente.hasMany(Sale_Client,{ foreignKey: 'Client'})

// // Um pensamento esta relacionado a um usuário
Sale_Client.belongsTo(Sale, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
Sale.hasMany(Sale_Client,{ foreignKey: 'Venda'})

// Exports module
module.exports = Sale_Client