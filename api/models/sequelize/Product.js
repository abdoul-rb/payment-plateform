const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Transaction = require('./Transaction');

class Product extends Model { };

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: 'Product'
    }
);

Product.belongsTo(Transaction);
module.exports = Product;