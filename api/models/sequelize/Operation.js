const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class Operation extends Model {
    static associate(models) {
        this.myAssociation = this
            .belongsTo(models.Transaction);
    }
};

Operation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('Capture', 'Remboursement'),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('En attente', 'Confirmee'),
            allowNull: false
        },
    },
    {
        sequelize: connection,
        modelName: 'Operation'
    }
);

Product.sync({
    alter: true
    // force: true,
});

module.exports = Operation;