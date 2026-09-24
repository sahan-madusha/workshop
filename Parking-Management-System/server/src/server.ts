import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { login } from './controllers/authController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Parking Management System API!',
    endpoints: {
      auth_login: '/api/auth/login',
      users: '/api/users'
    }
  });
});

// Auth endpoints
app.use('/api/auth', authRoutes);
app.post('/api/login', login);
app.post('/api/v1/login', login);

// User endpoints (JWT protected)
app.use('/api/users', userRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Parking Management Server running on http://localhost:${PORT}`);
  console.log(`👉 Auth Login endpoint: http://localhost:${PORT}/api/auth/login`);
  console.log(`👉 Users endpoint: http://localhost:${PORT}/api/users`);
});
