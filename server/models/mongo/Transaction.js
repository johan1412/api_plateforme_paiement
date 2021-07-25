const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
    billingAddress: {
        address: String,
        zipCode: String,
        city: String,
        country: String,
    },
    totalPrice: Number,
    currency: String,
    shippingAddress: {
        address: String,
        zipCode: String,
        city: String,
        country: String,
    }
});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;