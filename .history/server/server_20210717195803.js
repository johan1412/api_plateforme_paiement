const sequelize = require("./lib/sequelize");

const authRouter = require('./routes/auth');

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/product',productRouter);
app.use('/api/user',authRouter);
