const { Model, DataTypes } = require('sequelize');
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
    client_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false
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
module.exports = Transaction;