const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
  lastname: String,
  firstname: String,
  email: String,
  facturation: String,
  livraison: String,
  panier: Array,
  montant_commande: Number,
  currency: String,
});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;