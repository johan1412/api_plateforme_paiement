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
        currency: DataTypes.STRING
    },
    {
        sequelize: connection,
        modelName: "Transaction",
        paranoid: true,
    }
);


Transaction.belongsTo(ShippingAddress);
Transaction.belongsTo(BillingAddress);
Transaction.belongsTo(Cart);


module.exports = Transaction;


