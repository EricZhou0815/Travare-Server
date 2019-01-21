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
        let valid=false;
        if (req.body.thirdPartyAuth){
            const thirdPartyAuth=req.body.thirdPartyAuth;
            const user = await db
            .User
            .findOne({thirdPartyAuth: thirdPartyAuth});
            if (user) {
                valid=true;
            }
        }else{
            const user = await db
            .User
            .findOne({username: req.body.username});
            valid = await user.comparePassword(req.body.password);
        }

        const {id, username} = user;
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

//create user other information
exports.updateProfile=async (req,res,next)=>{
    try {
        const {firstName,lastName,city,country,about,mobile,} = req.body;
        const {id} = req.decoded;
        const user=await db.User.findById(id);
        user.firstName=firstName;
        user.lastName=lastName;
        user.city=city;
        user.about=about;
        user.country=country;
        user.mobile=mobile;
        await user.save();

        res
        .status(201)
        .json(user);

    } catch (err) {
        err.status=400;
        next(err);
    }
}

//get user profile
exports.getProfile=async (req,res,next)=>{
    try {
        const {id}=req.params;
        const user = await db
        .User
        .findById(id);

        res.status(201).json(user);
    } catch (err) {
        err.status=400;
        next(err);
    }
}

