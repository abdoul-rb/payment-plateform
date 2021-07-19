const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class User extends Model {}

user.init(
   {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: {
         type: DataTypes.STRING,
         validate: {
            isEmail: true
         },
         allowNull: false
      },
      password: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
   },
   {
      sequelize: connection,
      modelName: 'User'
   }
);

User.sync({
   alter: true,
});

module.exports = User;