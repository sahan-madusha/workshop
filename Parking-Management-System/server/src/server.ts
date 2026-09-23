import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Parking Management System API!',
    endpoint: '/api/users'
  });
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Parking Management Server running on http://localhost:${PORT}`);
  console.log(`👉 Test API at: http://localhost:${PORT}/api/users`);
});
