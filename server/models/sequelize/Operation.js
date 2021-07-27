const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class Operation extends Model {}

Operation.init(
    //Schema
    {
       type: DataTypes.STRING
    },
    {
        sequelize: connection,
        modelName: "operation",
        paranoid: true,
    }
);


Transaction.Operations = Transaction.hasMany(Operation);
Operation.Transaction = Operation.belongsTo(Transaction);

module.exports = Operation;
