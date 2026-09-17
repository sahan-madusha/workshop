import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: allow server to parse JSON request bodies
app.use(express.json());

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Day 03 Backend Workshop API!',
    endpoint: '/api/users'
  });
});

// Mount User Routes
app.use('/api/users', userRoutes);

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 Test API at: http://localhost:${PORT}/api/users`);
});
