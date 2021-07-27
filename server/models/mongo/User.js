const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const UserSchema = new Schema({
    userId: Number,
    role: String,
});

const User = conn.model("User", UserSchema);

module.exports = User;