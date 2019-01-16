const db=require('../models');


//register
exports.register=async (req,res,next)=>{
    try{
        const user=await db.User.create(req.body);
        const {id,username}=user;
        res.json({id,username});

    }catch(err){
        next(err);
    }

}

//login
exports.login=async (req,res,next)=>{
    try{
        const user =await db.User.findOne({username:req.body.username});
        const {id, username}=user;
        const valid=await user.comparePassword(req.body.password);

        if(valid){
            res.json({
                id,username
            });
        }else{
            throw new Err ('Invalid username/password');
        }
    }catch(errr){
        next(err);
    }
}


