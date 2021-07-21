const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Transaction extends Model { }

// A modifier
Transaction.init(
    //Schema
    {
        // infos_client
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
        email: DataTypes.STRING,

        facturation: DataTypes.STRING,
        livraison: DataTypes.STRING,
        panier: DataTypes.ARRAY,
        montant_commande: DataTypes.INTEGER,
        currency: DataTypes.STRING,
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
