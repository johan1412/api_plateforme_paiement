const connection = require("../lib/sequelize");
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
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    phone: DataTypes.STRING,
    courriel: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
    societyName: DataTypes.STRING,
    kbis: DataTypes.STRING,
    confirmationUrl: DataTypes.STRING,
    cancelUrl: DataTypes.STRING,
    currency: DataTypes.STRING,
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  {
    sequelize: connection,
    modelName: "User",
    paranoid: true,
  }
);

User.sync({
  alter:true,
  force:true
});

const cryptPassword = /* 1BBCFG34237 */ async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
};
User.addHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);
User.addHook("beforeUpdate", /* 1BBCFG34237 */ cryptPassword);
//User.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);

module.exports = User;
