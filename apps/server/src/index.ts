import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './lib/db';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
