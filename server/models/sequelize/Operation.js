const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class Operation extends Model {}

Operation.init(
    //Schema
    {
       type: DataTypes.ENUM('test','test2')
    },
    {
        sequelize: connection,
        modelName: "operation",
        paranoid: true,
    }
);


Transaction.Operations = Transaction.hasMany(Operation);
Operation.Transaction = Operation.belongsTo(Transaction);

console.log("aAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAAaAAAAAAAAAA")
module.exports = Operation;
