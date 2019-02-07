const jwt = require('jsonwebtoken');
const db = require('../models');

//register 
exports.register = async (req, res, next) => {
    try {
        const user = await db
            .User
            .create(req.body);

        if (user.uid === null) {
            user.uid = user.id;
        }

        const { uid, username } = user;

        const token = jwt.sign({
            uid,
            username
        }, process.env.SECRET);

        res
            .status(201)
            .json({ uid, username, token });

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
        let valid = false;
        let user;
        if (req.body.thirdPartyToken != undefined && req.body.thirdPartyToken != null) {
            const thirdPartyToken = req.body.thirdPartyToken;
            user = await db
                .User
                .findOne({ thirdPartyToken: thirdPartyToken });
            if (user) {
                valid = true;
            }
        } else {
            user = await db
                .User
                .findOne({ username: req.body.username });
            valid = await user.comparePassword(req.body.password);
        }

        if (valid) {
            const { uid, username } = user;
            const token = jwt.sign({
                uid,
                username
            }, process.env.SECRET);
            res.json({ uid, username, token });
        } else {
            throw new Error();
        }
    } catch (err) {
        err.message = 'Invalid Username/Password';
        next(err);
    }
}

//create user other information
exports.updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, city, country, about, mobile } = req.body;
        const { id } = req.decoded;
        const user = await db.User.findById(id);
        user.firstName = firstName;
        user.lastName = lastName;
        user.city = city;
        user.about = about;
        user.country = country;
        user.mobile = mobile;
        await user.save();

        res
            .status(201)
            .json(user);

    } catch (err) {
        err.status = 400;
        next(err);
    }
}

//get user profile
exports.getProfile = async (req, res, next) => {
    try {
        const { uid } = req.decoded;
        const user = await db
            .User
            .findOne({uid: uid}, '-_id -__v -created',);

        res.status(200).json(user);
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

