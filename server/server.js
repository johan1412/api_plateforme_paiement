const sequelize = require("./lib/sequelize");
const express = require("express");
const cors = require("cors");

const app = express();
const authRouter = require("./routes/auth");

//Middlewares
app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());

//Route Middlewares
app.use('/users', authRouter);


// app.listen(process.env.PORT || 3000, () => console.log("server is listening"));

app.listen(3000, () => console.log("server is listening"));