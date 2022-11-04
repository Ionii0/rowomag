const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const JwtService = require("../services/JwtService");
const authRouter = express.Router();
const bodyParser = require('body-parser');

authRouter.post('/login',bodyParser.json(), expressAsyncHandler(async (req, res) => {
    console.log(req.body);
        const loggedInUser = await UserModel.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (!loggedInUser) {
            res.status(401).send({
                message: 'Invalid Email or Password'
            });
        } else {
            res.send({
                _id: loggedInUser._id,
                username: loggedInUser.username,
                tokens: loggedInUser.tokens,
                isAdmin: loggedInUser.isAdmin,
                jwt: JwtService.generateToken(loggedInUser),

            })
        }
    })
);

module.exports = authRouter;
