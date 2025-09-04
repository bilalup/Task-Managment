import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import verifyToken from './middleware/verifyToken.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Parse cookies and JSON
app.use(cookieParser()); 
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    // In production you might want to exit process after a failure:
    // process.exit(1);
  });

// Health check
app.get('/', (req, res) => res.send('Hello from server! it is working!'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', verifyToken, taskRoutes);

// Use environment port (cPanel / Passenger will set this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
