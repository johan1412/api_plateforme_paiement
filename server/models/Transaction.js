const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Transaction extends Model { }

// A modifier
Transaction.init(
    //Schema
    {
        // infos_client
       /* consumer: {
            lastname: DataTypes.STRING,
            firstname: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        billingAdress: {
            adress: DataTypes.STRING,
            zipCode: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
        },
        cart: DataTypes.ARRAY,
        totalPrice: DataTypes.INTEGER,
        currency: DataTypes.STRING,
        shippingAdress: {
            adress: DataTypes.STRING,
            zipCode: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
        } */
    },
    {
        sequelize: connection,
        modelName: "Transaction",
        paranoid: true,
    }
);

Transaction.sync({
    alter: true,
    force: true
});


module.exports = Transaction;
