import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
import { request } from 'express';


export const test = (req, res) => {
    res.json({
        message: 'API route is working!',
    });
};

export const updateUser = async (req, res, next) => {
    // console.log("req",req);
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true})
 
      const {password, ...rest}= updatedUser._doc
      res.status(200).json(rest);  
    } catch (error) {
        next(error);
    }
};
export const deleteUser=async(req,res,next)=>{
    
          if (req.user.id !== req.params.id)
           return next (errorHandler(401, 'You can only delete your own account!'));
          try {
           await User.findByIdAndDelete(req.params.id);
           res.clearCookie('access_token');
           res.status(200).json ('User has been deleted!');
          } catch (error) {
           next(error);
          }
        
};
export const getUserListings=async(req,res,next)=>{
    if(req.user.id === req.params.id){
        try {
            const listings= await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401, 'you can view only your listings'));
    }
};
export const getUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id);

    if(!user)return next(errorHandler(404,'User not found!!'));

    const {password:pass, ...rest}=user._doc;
    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    
}
export const addtofavourites=async(req,res,next)=>{
    try {
        const listing=await Listing.findById(req.params.id);
        console.log(listing);
        const user = await User.findByIdAndUpdate(req.user.id, {
            $push: {
                favourites : req.params.id,
            }
        },{new:true})
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
    
}

export const getFevs=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id).populate('favourites');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, favourites: user.favourites });
    } catch (error) {
        next(error);
    }
    
}


