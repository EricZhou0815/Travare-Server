const router=require('express').Router();

const handle=require('../handlers');
const auth = require('../middlewares/auth');

router.post('/register',handle.register);
router.post('/login',handle.login);
router.post('/profile',auth,handle.updateProfile);
router.get('/profile',auth,handle.getProfile);

module.exports=router;

