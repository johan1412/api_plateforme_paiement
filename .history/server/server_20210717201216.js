const sequelize = require("./lib/sequelize");
const app =  require('express');

const authRouter = require("./routes/auth");

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRouter);
