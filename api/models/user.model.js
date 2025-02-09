import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        reqired:true,
        unique:true,
    },
    email:{
        type:String,
        reqired:true,
        unique:true,
    },
    password:{
        type:String,
        reqired:true,
    },
},{timestamps:true});

const User =mongoose.model('User',userSchema);

export default User;