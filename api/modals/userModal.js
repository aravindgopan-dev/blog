import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true }
)
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

const User=mongoose.model("User",userSchema);

export default User;