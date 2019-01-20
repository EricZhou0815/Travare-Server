const db = require("../models");

module.exports = {
    showJourneys: async (req, res, next) => {
        try {
            const journeies = await db
                .Journey
                .find()
                .populate("user", ["id"]);

            res
                .status(200)
                .json(journeies);
        } catch (err) {
            err.status = 400;
            next(err);
        }
    },
    createJourney: async (req, res, next) => {
        console.log(req.body);
        try {
            const journey = await db
                .Journey
                .create(req.body);
                //add publisher to matched User list
                if (journey.role=="driver") {
                    journey.matchedUser.push(journey.publisher);
                    await journey.save();
                }

            res
                .status(201)
                .json(journey);
        } catch (err) {
            err.status = 400;
            next(err);
        }
    },
    recommendJourney: async (req, res, next) => {
        try {
            //find the journey
            const {id} = req.params;
            const journey = await db
                .Journey
                .findById(id);

            const journeyTime = journey.dateTime;
            const fromLocLong = journey
                .fromLocation
                .loc
                .coordinates[0];
            const fromLocLat = journey
                .fromLocation
                .loc
                .coordinates[1];
            const toLocLong = journey
                .toLocation
                .loc
                .coordinates[0];
            const toLocLat = journey
                .toLocation
                .loc
                .coordinates[1];
            // find journeys in the near time, fromLocation and toLocation are in 5000
            // meters range of targeted journey
            const journeys = await db
                .Journey
                .find({
                    fromLocation: {
                        loc: {
                            $nearShpere: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [fromLocLong, fromLocLat]
                                },
                                $maxDistance: 5000
                            }
                        }
                    },
                    toLocation: {
                        loc: {
                            $nearShpere: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [toLocLong, toLocLat]
                                },
                                $maxDistance: 5000
                            }
                        }
                    },
                    dateTime: {
                        time: {
                            $gt: journeyTime - 60 * 60 * 1000,
                            $lt: maxTime + 60 * 60 * 1000
                        }
                    }
                });

            res
                .status(201)
                .json(journeys);
        } catch (err) {
            err.status = 400;
            next(err);
        }
    },
    //matched: push passenger's user_id to driver's journey
    //default status: matching
    //input:journey_id,journey_status,user_id (passenger)
    changeJourneyStatus: async (req, res, next) => {
        try {
            const {id} = req.params;
            const {status}=req.body;
            const {id:userId}=req.decoded;
            const journey = await db
                .Journey
                .findById(id);

            switch (status) {
                case matched:
                    journey.matchedUser.push(userId);
                    //put userid into users list
                    break;
                case starting:
                    //
                    break;
                case closed:
                   //
                    break;
                default:
                    break;
            }
            journey.status = status;
            await journey.save();
            res
                .status(201)
                .json(journey);

        } catch (err) {
            err.status = 400;
            next(err);
        }

    },
    deleteJourney:async (req,res,next)=>{
        try {
            const {id: journeyId} = req.params;
            const {id: userId} = req.decoded;
            const journey = await db
                .Journey
                .findById(journeyId);
            
            if (!journey) throw new Error('No journey found');
    
            await journey.remove();
            res
            .status(202)
            .json(journey);
            
        } catch (err) {
            err.status=400;
            next(err);
        }
    },
    //give journey stars and calculate the average stars of this journey
    //and calculate users' average star
    rateJourney:async (req,res,next)=>{

    }
    
};
