const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
    fromLocation: {
        name: String,
        area: String,
        loc: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number], //GeoJson Style: [longtitude,latitude]
                required: true
            }
        }
    },
    toLocation: {
        name: String,
        area: String,
        loc: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number], //GeoJson Style: [longtitude,latitude]
                required: true
            }
        }
    },
    dateTime: {
        type: Date,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role: {
        type: String,
        enum: [
            "driver", "passenger"
        ],
        required: true,
        default: "passenger"
    },
    status: {
        type: String,
        enum: [
            "matching", "matched", "starting", "closed"
        ],
        required: true,
        default: "matching"
    },
    co2Reduction: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    //This is the Many side of the One-To-Many relationship
    matchedUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    chatedUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Journey", journeySchema);