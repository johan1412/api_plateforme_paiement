const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Cart = require("./Cart");
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


Transaction.hasOne(ShippingAddress,{as:"shipping_address",foreignKey:"shipping_address_id"});
Transaction.hasOne(BillingAddress,{as:"billing_address",foreignKey:"billing_address_id"});
Transaction.hasOne(Cart,{as:"cart",foreignKey:"cart_id"});

Transaction.sync({
    alter: true,
    force: true
});



module.exports = Transaction;


