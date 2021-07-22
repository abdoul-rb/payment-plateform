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
      name: DataTypes.STRING,
      company: DataTypes.STRING,
      phone_number: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      email: {
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
      kbis: DataTypes.STRING,
      url_confirmation: DataTypes.STRING,
      url_cancellation: DataTypes.STRING,
      currency: DataTypes.STRING,
      roles: DataTypes.STRING,
      isValidated: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      created_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         field: 'created_at'
      },
      updated_at: {
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