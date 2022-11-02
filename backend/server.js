const express = require('express');
const cors = require('cors');
const data = require("./data.js");
const mongoose = require('mongoose');
const config = require("./config");
const userRouter = require("./routes/UserRoute.js");

const app = express();
app.use(cors());

//ROUTERS MIDDLEWARE
app.use('/api/users', userRouter);

//PRODUCTS ROUTES
app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product)
        res.send(product);
    else res.status(404);
})

//RUN APPLICATION
app.listen(5000, () => {
    console.log("Server is running on port 5000...")
});

//CONNECT TO DB
mongoose.connect(config.MONGODB_URL).then(() => {
    console.log("Connected to the database");
}).catch(error => console.log(error));
