const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        index: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    thirdPartyToken: String,
    thirdPartySource: String,
    email: String,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    avatar: String,
    about: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    stars: {
        type: Number,
        default: 0
    },
    co2Reduction: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

userSchema.plugin(uniqueValidator);

//encrypt password
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 12);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

//compare password
userSchema.methods.comparePassword = async function (attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.password);
    } catch (err) {
        next(err);
    }
}

module.exports = mongoose.model('User', userSchema);