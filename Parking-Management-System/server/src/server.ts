import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const APP_NAME = process.env.APP_NAME || 'Application API';

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', authRoutes);

// Health Check / Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: `Welcome to ${APP_NAME}`,
    endpoints: {
      login: '/api/login',
      me: '/api/me',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
