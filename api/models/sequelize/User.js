const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      emai: {
         type: DataTypes.STRING,
         validate: {
            isEmail: true
         },
         allowNull: false,
         unique: true
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: false
      },
      confirmed: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      createdAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         field: 'created_at'
      },
      updatedAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         field: 'updated_at'
      }
   },
   {
      sequelize: connection,
      modelName: 'User'
   }
);

const encodePassword = async (user) => {
   user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
};
User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);

module.exports = User;