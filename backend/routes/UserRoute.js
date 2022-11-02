const express = require('express');
const UserModel = require('../models/UserModel');
const userRouter = express.Router();

userRouter.get(`/createadmin`, async (req, res) => {
    try {
        const userModel = new UserModel({
            name: 'admin',
            password: 'euroavia',
            tokens: 0,
            isAdmin: true
        });
        const createdUser = await userModel.save();
        res.send(createdUser);
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
});

module.exports = userRouter;
