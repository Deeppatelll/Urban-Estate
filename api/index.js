import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
// Fixed the connection string by URL-encoding the password
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});


const app = express();
app.use(express.json());

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
app.use('/api/user',UserRouter);
app.use('/api/auth',authRouter);