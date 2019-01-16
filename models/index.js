const mongoose=require('mongoose');

mongoose.set('debug',true);
mongoose.set.Promise=global.Promise;
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travare-h7xx9.mongodb.net/test?retryWrites=true`);

module.exports.User=require('./user');
module.exports.Pull=require('./poll');
module.exports.Jounery=require('./jounery');