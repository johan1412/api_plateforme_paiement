const User = require("./User");
const Cart = require("./Cart");
const BillingAddress = require("./BillingAddress");
const ShippingAddress = require("./ShippingAddress");
const Product = require("./Product");
const Transaction = require("./Transaction");
const Operation = require("./Operation");

const connection = require("../../lib/sequelize");

connection.sync().then((_) => console.log("Database synced"));

module.exports = {
  User,
  Cart,
  BillingAddress,
  ShippingAddress,
  Product,
  Transaction,
  Operation
};
