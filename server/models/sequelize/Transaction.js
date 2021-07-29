const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Cart = require("./Cart");
const User = require("./User");
const BillingAddress = require("./BillingAddress");
const ShippingAddress = require("./ShippingAddress");

class Transaction extends Model { }

// A modifier
Transaction.init(
    //Schema
    {
        totalPrice: DataTypes.DOUBLE,
        currency: DataTypes.STRING,
        customer: DataTypes.STRING,
    },
    {
        sequelize: connection,
        modelName: "transaction",
        paranoid: true,
    }
);


Transaction.ShippingAddress = Transaction.belongsTo(ShippingAddress);
ShippingAddress.Transaction = ShippingAddress.hasOne(Transaction);

Transaction.BillingAddress = Transaction.belongsTo(BillingAddress);
BillingAddress.Transaction = BillingAddress.hasOne(Transaction);

Transaction.Cart = Transaction.belongsTo(Cart);
Cart.Transaction = Cart.hasOne(Transaction);

module.exports = Transaction;


