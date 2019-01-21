const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
    },
    thirdPartyAuth:String,
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
    picture:String,
    about:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    stars:{
        type:Number,
        default:0
    },
    greenLevel:{
        type:Number,
        default:1
    },
    created:{
        type:Date,
        default:Date.now,
    }
});


//encrypt password
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashed=await bcrypt.hash(this.password,12);
        this.password=hashed;
        return next();
    } catch(err){
        return next(err);
    }
});

//compare password
userSchema.methods.comparePassword=async function(attempt,next){
    try{
        return await bcrypt.compare(attempt,this.password);
    }catch(err){
        next(err);
    }

}


module.exports=mongoose.model('User',userSchema);