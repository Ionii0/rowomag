const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const UserModel = require('../models/UserModel');
const isAdmin = require("../middlewares/isAdmin");

const userRouter = express.Router();

userRouter.get(`/create-admin`, expressAsyncHandler(async (req, res) => {
        try {
            const userModel = new UserModel({
                username: 'admin',
                password: 'euroavia',
                tokens: 100,
                isAdmin: true
            });
            const createdUser = await userModel.save();
            res.send(createdUser);
        } catch (e) {
            res.status(500).send({
                message: e.message
            })
        }
    })
);

userRouter.post('/create-user', [bodyParser.json(),isAdmin], expressAsyncHandler(async (req, res) => {
        const userModel = new UserModel({
            username: req.body.username,
            password: req.body.password,
            tokens: req.body.tokens,
            isAdmin: false
        });
        const createdUser = await userModel.save();
        res.status(201).send({
            message: `New user ** ${req.body.username} ** has been created (password ${req.body.password} | tokens ${req.body.tokens})`
        });
    })
);

module.exports = userRouter;
