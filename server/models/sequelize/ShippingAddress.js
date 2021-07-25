  
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class ShippingAddress extends Model {}

ShippingAddress.init(
  //Schema
  {
    adress: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "ShippingAddress",
    paranoid: true,
  }
);

module.exports = ShippingAddress;