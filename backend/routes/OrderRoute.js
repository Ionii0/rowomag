const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const OrderModel = require('../models/OrderModel.js');
const isAuth = require("../middlewares/isAuth.js");
const UserModel = require('../models/UserModel');

const orderRouter = express.Router();

orderRouter.post('/', [bodyParser.json(), isAuth],
    expressAsyncHandler(async (req, res) => {

        const order = new OrderModel({
            items: req.body.items,
            price: req.body.price,
            username: req.user.username,
            user: req.user._id
        });

        const user = await UserModel.findOne({
            _id: req.user._id,
            username: req.user.username,
        });

        if (user.tokens < req.body.price) {
            res.status(406).send({
                message: 'You do not have enough tokens!'
            })
        } else {
            remainingTokens = user.tokens - req.body.price;
            await UserModel.updateOne({_id: req.user._id}, {tokens: remainingTokens});
            const createdOrder = await order.save();
            console.log("New order created --------------------------");
            console.log(createdOrder);
            console.log("--------------------------------------------");
            res.status(201).send({
                message: 'New Order Created'
            });
        }

    })
);
module.exports = orderRouter;
