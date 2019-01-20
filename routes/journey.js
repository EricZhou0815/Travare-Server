const router = require('express').Router();

const handle = require('../handlers');
const auth = require('../middlewares/auth');

router
    .route('/')
    .get(handle.showJourneys)
    .post(handle.createJourney);

router
    .route('/:id')
    .get()
    .post()
    .delete();

module.exports = router;