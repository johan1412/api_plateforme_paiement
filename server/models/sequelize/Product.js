  
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Cart = require("./Cart");

class Product extends Model {}

Product.init(
  //Schema
  {
    name: DataTypes.STRING,
    unitPrice: DataTypes.DOUBLE,
  },
  {
    sequelize: connection,
    modelName: "Product",
    paranoid: true,
  }
);


module.exports = Product;