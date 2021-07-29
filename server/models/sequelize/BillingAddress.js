  
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class BillingAddress extends Model {}

BillingAddress.init(
  //Schema
  {
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "billingAddress",
    paranoid: true,
  }
);



module.exports = BillingAddress;