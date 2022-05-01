const { DataTypes} = require ('sequelize')
const Produto = require('./Produto')
const Sale = require('./Sale')
const db = require('../db/conn')

// Tabela no banco
const Sale_Product = db.define('Sale_Product', {
    quantidade: {
        type: DataTypes.INTEGER,//tipo string
        require: true//Não aceita valores vazios
    }
})

// // Um pensamento esta relacionado a um usuário
Sale_Product.belongsTo(Produto, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
Produto.hasMany(Sale_Product,{ foreignKey: 'Produto_Id'})

// // Um pensamento esta relacionado a um usuário
Sale_Product.belongsTo(Sale, {foreignKey: 'id'})

// // Um Usuari tem muitos pensamentos
Sale.hasMany(Sale_Product,{ foreignKey: 'Venda_Id'})

// Exports module
module.exports = Sale_Product