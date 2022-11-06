const jwt = require("jsonwebtoken");
const config = require("../config");

const isAdmin = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({message: 'Token is not supplied'});
    } else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({message: 'Invalid Token'});
            } else {
                if(data.isAdmin !== true){
                    res.status(403).send({message:'Forbidden user'});
                }
                req.user = data;
                next();
            }
        });
    }
};

module.exports = isAdmin;
