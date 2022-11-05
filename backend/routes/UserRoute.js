const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const userRouter = express.Router();

userRouter.get(`/createadmin`, expressAsyncHandler(async (req, res) => {
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

module.exports = userRouter;
