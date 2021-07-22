const sequelize = require("./lib/sequelize");
const express =  require('express');

const app = express();

const authRouter = require("./routes/auth");

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRouter);