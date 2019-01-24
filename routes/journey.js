const router = require('express').Router();

const handle = require('../handlers');
const auth = require('../middlewares/auth');

router
    .route('/')
    .get(auth, handle.showJourneys)
    .post(auth, handle.createJourney);

router
    .route('/:id')
    .get(auth, handle.getJourney)
    .post(auth, handle.matchJourneys)
    .put(auth,handle.changeJourneyStatus)
    .delete(auth, handle.deleteJourney);

router
    .route('/:id/rate')
    .post(auth, handle.rateJourney);

module.exports = router;