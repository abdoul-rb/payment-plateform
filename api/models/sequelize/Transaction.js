const { Model, DataTypes } = require('sequelize');
const Product = require('./Product');
const User = require('./User');
const connection = require('../../lib/sequelize');

class Transaction extends Model { };

Transaction.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    modelName: 'Transaction',
  }
);

Transaction.hasMany(Product);
Transaction.hasOne(User);
module.exports = Transaction;