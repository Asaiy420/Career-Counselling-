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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
