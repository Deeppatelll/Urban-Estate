import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error:', err);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());
// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Update this to match your frontend URL
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, // Allow cookies to be sent
}));

// Routes
app.use('/api/user', UserRouter);
app.use('/api/auth', authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

