const sequelize = require("./lib/sequelize");

const authRouter = require("./routes/auth")

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRouter);
