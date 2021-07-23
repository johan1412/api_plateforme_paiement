const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const CurrencySchema = new Schema({
    rates: {
        
    },
});

const Currency = conn.model("Currency", CurrencySchema);

module.exports = Currency;