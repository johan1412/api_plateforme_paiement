const Product = require("./Product");

const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");


class Cart extends Model {}

Cart.init(
  //Schema
  {
    quantities: DataTypes.INTEGER
  },
  {
    sequelize: connection,
    modelName: "Cart",
    paranoid: true,
  }
);

Cart.hasMany(Product,{as:"product",foreignKey: 'product_id'});

Cart.sync({
  alter: true
});



module.exports = Cart;