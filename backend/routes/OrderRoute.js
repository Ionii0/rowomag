const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const UserModel = require('../models/UserModel');
const OrderModel = require('../models/OrderModel.js');
const ProductModel = require('../models/ProductModel');
const isAuth = require("../middlewares/isAuth.js");
const isAdmin = require("../middlewares/isAdmin");

const orderRouter = express.Router();

orderRouter.post('/', [bodyParser.json(), isAuth],
    expressAsyncHandler(async (req, res) => {

        const order = new OrderModel({
            items: req.body.items,
            price: req.body.price,
            username: req.user.username,
            user: req.user._id
        });

        //Handling possible errors
        let errorMessage = ``;
        for (let i = 0; i < req.body.items.length; i++) {
            console.log(req.body.items[i]._id);
            const product = await ProductModel.findOne({_id: req.body.items[i]._id});
            if (product.stock < req.body.items[i].quantity) {
                errorMessage += `Not enough ** ${req.body.items[i].name} ** in stock!\n`
            }
        }
        const user = await UserModel.findOne({
            _id: req.user._id,
            username: req.user.username,
        });

        if (user.tokens < req.body.price) {
            errorMessage += `You do not have enough tokens!`;
            res.status(406).send({
                message: errorMessage
            });
        } else {
            const remainingTokens = user.tokens - req.body.price;
            await UserModel.updateOne({_id: req.user._id}, {tokens: remainingTokens});
            for (let i = 0; i < req.body.items.length; i++)
                await ProductModel.findOneAndUpdate({_id: req.body.items[i]._id}, {$inc: {stock: -req.body.items[i].quantity}});
            const createdOrder = await order.save();
            res.status(201).send({
                message: 'New Order Created'
            });
        }
    })
);
orderRouter.get('/pending', [bodyParser.json(), isAdmin], expressAsyncHandler(async (req, res) => {
        const pendingOrders = await OrderModel.find({isDelivered: false});
        res.send(pendingOrders);
    })
);

orderRouter.get('/delivered', [bodyParser.json(), isAdmin], expressAsyncHandler(async (req, res) => {
        const deliveredOrders = await OrderModel.find({isDelivered: true});
        res.send(deliveredOrders);
    })
);

orderRouter.get('/deliver-order/:id', [bodyParser.json(), isAdmin], expressAsyncHandler(async (req, res) => {
        await OrderModel.updateOne({_id: req.params.id}, {isDelivered: true});
        res.send({message: `The order ${req.params.id} updated`});
    })
);

module.exports = orderRouter;
