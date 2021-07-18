var cors = require('cors')
const sequelize = require("./lib/sequelize");
const express =  require('express');
const app = express();
const authRouter = require("./routes/auth");

app.use(cors()) // Use this after the variable declaration

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/users',authRouter);

app.listen(3001,() => console.log("server is listening"));