const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const CurrencySchema = new Schema({
    rates: [{
        currency: String,
        value: Number
    }]
});

const Currency = conn.model("Currency", CurrencySchema);

module.exports = Currency;