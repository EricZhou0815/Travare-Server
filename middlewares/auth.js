const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //token is at the second part of the header.
    //a header is like 'Bearer sfdsj43dfgnheijfoawvns'
    if(req.header.authorization){
        const token=req.headers.authorization.split(' ')[1];
        jwt.verift(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                next(Error('Failed to authentication token'));
            }else{
                req.decoded=decoded;
                next();
            }
        })
    }else{
        next(Error('No token provided'));
    }
}