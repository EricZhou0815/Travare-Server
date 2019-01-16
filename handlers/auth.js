const jwt = require('jsonwebtoken');

const db = require('../models');

//register
exports.register = async (req, res, next) => {
    try {
        const user = await db
            .User
            .create(req.body);
        const {id, username} = user;

        const token = jwt.sign({
            id,
            username
        }, process.env.SECRET);

        res
            .status(201)
            .json({id, username, token});

    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Sorry, that username is already taken';
        }
        next(err);
    }

}

//login
exports.login = async (req, res, next) => {
    try {
        const user = await db
            .User
            .findOne({username: req.body.username});
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);

        if (valid) {
            const token = jwt.sign({
                id,
                username
            }, process.env.SECRET);
            res.json({id, username, token});
        } else {
            throw new Error();
        }
    } catch (errr) {
        err.message = 'Invalid Username/Password';
        next(err);
    }
}
