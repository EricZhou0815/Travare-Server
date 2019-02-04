const db = require("../models");

module.exports = {
    showJourneys: async (req, res, next) => {
        console.log(req.decoded);
        try {
            const {id}=req.decoded;
            const journeies = await db
                .Journey
                .find({
                   $or:[{publisher:id},{matchedUser:[id]}] 
                });
                
            res
                .status(200)
                .json(journeies);
        } catch (err) {
            err.status = 400;
            next(err);
        }
    },
    createJourney: async (req, res, next) => {
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
    //show a journey details
    getJourney:async (req,res,next)=>{
        try {
            const {id}=req.params;
            const journey = await db
                    .Journey
                    .findById(id);

            res.status(201).json(journey);
        } catch (err) {
            err.status=400;
            next(err);
        }
    },
    //match journey within location (within 5 km range of depart and arrive locations) and time (within 1 hour)
    matchJourneys: async (req, res, next) => {
        try {
            //find the journey
            const {id} = req.params;
            const journey = await db
                .Journey
                .findById(id);

            const journeyTime = journey.dateTime;
            const earlyTime=new Date(journeyTime-60*60*1000);
            const laterTime=new Date(journeyTime+60*60*1000);
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
            console.log(journey);
            const journeys = await db
                .Journey
                .find({
                    dateTime: {
                        $gt: earlyTime,
                        $lt: laterTime
                    },
                  fromLocation: {
                        loc: {
                            $near: {
                                $maxDistance:5000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: [fromLocLong, fromLocLat]
                                },
                            }
                        }
                    },
                    toLocation: {
                        loc: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [toLocLong, toLocLat]
                                },
                                $maxDistance: 5000
                            }
                        }
                    }
                
                }).limit(4);
            
            console.log(journeys);

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
                case "matched":
                    journey.matchedUser.push(userId);
                    //put userid into users list
                    break;
                case "starting":
                    //
                    break;
                case "closed":
                   //need to calculate the CO2Reduction
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
  
    rateJourney:async (req,res,next)=>{
       try {
            const {id: journeyId} = req.params;
            const {star}=req.body;
            const journey = await db
                .Journey
                .findById(journeyId);

            if (journey.star==0) {
                journey.star=star; 
            } else {
                journey.star=(star+journey.star)/2;
            }    
            await journey.save();

            res
            .status(202)
            .json(journey);

       } catch (err) {
           err.status=400;
           next(err);
        }
    }
    
};
