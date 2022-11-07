const express = require('express');
const cors = require('cors');
const data = require("./data.js");
const mongoose = require('mongoose');
const config = require("./config");
const userRouter = require("./routes/UserRoute.js");
const authRouter = require("./routes/AuthRoute");
const orderRouter = require("./routes/OrderRoute");
const productsRouter = require("./routes/ProductsRoute");


const app = express();

//EXPRESS MIDDLEWARE
app.use(cors());
app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({
        message: err.message
    });
});

//ROUTERS MIDDLEWARE
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/products',productsRouter);

//RUN APPLICATION
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000...")
});

//CONNECT TO DB
mongoose.connect(config.MONGODB_URL).then(() => {
    console.log("Connected to the database");
}).catch(error => console.log(error));
