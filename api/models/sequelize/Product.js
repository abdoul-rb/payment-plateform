const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Transaction = require('./Transaction');

class Product extends Model {
    static associate(models) {
        this.myAssociation = this
            .belongsTo(models.Transaction);
    }
};

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

Product.sync({
    // alter: true
    // force: true,
  });

module.exports = Product;