const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const ProductModel = require('../models/ProductModel');
const isAuth = require("../middlewares/isAuth.js");

const productsRouter = express.Router();

productsRouter.post('/', [bodyParser.json(), isAuth],
    expressAsyncHandler(async (req, res) => {
        const products = await ProductModel.find();
        res.send(products);
    })
);

productsRouter.post('/:id', [bodyParser.json(), isAuth],
    expressAsyncHandler(async (req, res) => {
        const product = await ProductModel.findOne({_id: req.params.id});
        res.send(product);
    })
);
module.exports = productsRouter;
