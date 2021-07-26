
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Product = require("./Product");


class Cart extends Model {}

Cart.init(
  //Schema
  {
    quantities: DataTypes.INTEGER
  },
  {
    sequelize: connection,
    modelName: "cart",
    paranoid: true,
  }
);

Cart.hasMany(Product);
Product.belongsTo(Cart); 

module.exports = Cart;