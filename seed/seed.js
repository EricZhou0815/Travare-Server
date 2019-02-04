require('dotenv').config();
const mongoose=require('mongoose');

mongoose.set('debug',true);
mongoose.Promise=global.Promise;
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travare-h7xx9.mongodb.net/test?retryWrites=true`);

const db=require('../models');

const users=[
    {username:'Eric',password:'hily2006'},
    {username:'JC',password:'jczhong'}
];

const polls=[
    {
        question:'Which is the best JavaScript framework',
        options:['Angular','React','VueJs']
    },
    {
        question:'Who is the best mutant', options:['Wolverine','Deadpool']
    },
    {
        question:'Truth or dare', options:['Truth','Dare']
    },
    {
        question:'Boolean?',options:['True','False']
    }
];

const seed=async()=>{
    try{
        //await db.User.remove();
        //console.log('DROP ALL USERS');

        //await db.Poll.remove();
        //console.log('DROP ALL POLLS');

        await Promise.all(
            users.map(async user=>{
                const data=await db.User.create(user);
                await data.save();
            })
        );
        console.log('CREATED USERS', JSON.stringify(users));

        await Promise.all(
            polls.map(async poll=>{
                poll.options=poll.options.map(option=>({option,vote:0}));
                const data=await db.Poll.create(poll);
                const user=await db.User.findOne({username:'Eric'});
                data.user=user;
                user.polls.push(data._id);
                await user.save();
                await data.save();
            })
        );
        console.log('CREATED POLLS', JSON.stringify(polls));
    }catch(err){
        console.error(err);
    }
};

seed();