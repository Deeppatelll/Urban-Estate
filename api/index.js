import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

const __dirname = path.resolve();
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));

app.use('/api/user', UserRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ success: false, statusCode, message });
});

// Start server and handle port in use issue
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is in use, trying another port...`);
        const newServer = app.listen(0, () => {
            console.log(`Server is running on port ${newServer.address().port}`);
        });
    } else {
        console.log('Server error:', err);
    }
});

