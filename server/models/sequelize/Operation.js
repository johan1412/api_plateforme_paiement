
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Operation extends Model { }

Operation.init(
    //Schema
    {
        name: DataTypes.STRING,
    },
    {
        sequelize: connection,
        modelName: "operation",
        paranoid: true,
    }
);


module.exports = Operation;