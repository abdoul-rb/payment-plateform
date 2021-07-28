const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const bcrypt = require("bcryptjs");
const Transaction = require('./Transaction');

class User extends Model {
   static associate(models) {
      this.myAssociation = this
         .belongsTo(models.Transaction);
   }
}

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: 'Votre nom est obligatoire.'
            }
         }
      },
      company: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: 'Précisez le nom de votre société.'
            }
         }
      },
      phone_number: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: {
               args: true,
               msg: 'Adresse email invalide'
            },
         },
         allowNull: false,
         lowercase: true,
         unique: {
            args: true,
            msg: 'Cette adresse email est déjà utilisée'
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            min: {
               args: 8,
               msg: 'Le mot de passe doit faire au moins 8 caractères'
            }
         }
      },
      kbis: DataTypes.STRING,
      url_confirmation: { 
         type: DataTypes.STRING,
         allowNull: true,
      },
      url_cancellation: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      currency: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            is: {
               args: /^[$€]{1}$/,
               msg: 'Vous devez saisir une devise valide ($, €)'
            }
         }
      },
      roles: DataTypes.ENUM('ADMIN', 'SUPPLIER'),
      isValidated: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      },
      client_token: { 
         type: DataTypes.STRING,
         allowNull: true,
      },
      client_secret: { 
         type: DataTypes.STRING,
         allowNull: true,
      },
   },
   {
      sequelize: connection,
      modelName: 'User'
   }
);

User.sync({
   // alter: true
   // force: true,
});

const encodePassword = async (user) => {
   user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
};
User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);

module.exports = User;