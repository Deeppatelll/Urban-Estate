import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice:{
    type:Number,
    reqired:true,
  },
  discountPrice:{
    type:Number,
    reqired:true,
  },
  bathrooms:{
    type:Number,
    required:true ,
},
bedrooms:{
    type:Number,
    reqired:true,
},
furnished:{
    type:Boolean,
    required:true,
},
parking:{
    type:Boolean,
    required:true,
},
type:{
    type:String,
    required:true,
},
offer:{
    type:Boolean,
    reqired:true,
},
imageUrls:{
    type:Array,
    required:true,
},
userRef:{
    type:String,
    required:true,
},


},{timestamps:true}
)

const Listing =mongoose.model('Listing',listingSchema);
export default Listing;