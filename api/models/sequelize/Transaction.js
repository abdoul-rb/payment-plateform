const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Product = require('./Product');
const User = require('./User');

class Transaction extends Model {
  static associate(models) {
    this.myAssociation = this
      .hasOne(models.User)
      .hasMany(models.Product);
  }
};

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

module.exports = Transaction;