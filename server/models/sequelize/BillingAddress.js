  
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class BillingAddress extends Model {}

BillingAddress.init(
  //Schema
  {
    adress: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "BillingAddress",
    paranoid: true,
  }
);



module.exports = BillingAddress;