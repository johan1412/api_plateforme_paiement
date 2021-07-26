  
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class ShippingAddress extends Model {}

ShippingAddress.init(
  //Schema
  {
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "shippingAddress",
    paranoid: true,
  }
);

module.exports = ShippingAddress;