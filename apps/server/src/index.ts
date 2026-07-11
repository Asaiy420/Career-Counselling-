import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './lib/db';

import authRoutes from './routes/auth.route';
import careerRoutes from './routes/career.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});