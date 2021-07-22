const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
    consumer: {
        lastname: String,
        firstname: String,
        email: String,
    },
    billingAdress: {
        adress: String,
        zipCode: String,
        city: String,
        country: String,
    },
    cart: Array,
    totalPrice: Number,
    currency: String,
    shippingAdress: {
        adress: String,
        zipCode: String,
        city: String,
        country: String,
    }
});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;