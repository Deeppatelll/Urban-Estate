import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Fixed typo from "reqired" to "required"
    unique: true,
  },
  email: {
    type: String,
    required: true, // Fixed typo from "reqired" to "required"
    unique: true,
  },
  password: {
    type: String,
    required: true, // Fixed typo from "reqired" to "required"
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;