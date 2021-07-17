const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

class User extends Model {}

User.init(
  //Schema
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    societyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    confirmationUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    cancelUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
    currency: {
            type: DataTypes.STRING,
            allowNull: true,
        }
  },
  {
    sequelize: connection,
    modelName: "User",
    paranoid: true,
  }
);

const cryptPassword = /* 1BBCFG34237 */ async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
};
User.addHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);
User.addHook("beforeUpdate", /* 1BBCFG34237 */ cryptPassword);
//User.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);

module.exports = User;
