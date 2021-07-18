const connection = require("../../lib/sequelize");
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

        facturation: {
            type: DataTypes.STRING,
        },
        livraison: {
            type: DataTypes.STRING,
        },
        panier: {
            type: DataTypes.STRING,
        },
        montant_commande: {
            type: DataTypes.INTERGER,
        }
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
