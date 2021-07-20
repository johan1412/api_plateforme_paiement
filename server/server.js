// var cors = require('cors')
const sequelize = require("./lib/sequelize");
const express = require("express");
const cors = require("cors");

const app = express();
const authRouter = require("./routes/auth");

const dotenv = require('dotenv');

dotenv.config();
// app.use(cors()) // Use this after the variable declaration

//Middlewares
app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());

//Route Middlewares
app.use('/users', authRouter);

app.listen(3000, () => console.log("server is listening"));
