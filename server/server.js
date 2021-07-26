
const sequelize = require("./lib/sequelize");
const express = require("express");
const cors = require("cors");
const Currency = require("./models/mongo/Currency");

const { MongooseGenerator, Scrapper } = require("./scrapper");

const app = express();
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const currencyRouter = require("./routes/currency");
const marchantRouter = require("./routes/admin");

const dotenv = require('dotenv');

var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 * * * *', function () {
    new Scrapper(
        { url: "http://api.exchangeratesapi.io/v1/latest?access_key=52c76c294d6c9b2cbb3dd2a282e28e19" },
        (data) => data.rates,
        (data) => MongooseGenerator(data, Currency)
    ).scrap();
}, null, true, 'America/Los_Angeles');
job.start();

dotenv.config();
app.use(cors()) // Use this after the variable declaration

//Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//Route Middlewares
app.use('/users', authRouter);
app.use('/admin', adminRouter);
app.use('/currency', currencyRouter);
app.use('/marchant', marchantRouter);

app.listen(3000, () => console.log("server is listening"));
