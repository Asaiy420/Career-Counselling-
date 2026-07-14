import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.warn('MONGODB_URI not set — skipping MongoDB connection');
            return null;
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Do not exit process; return null so server can still run in dev
        return null;
    }
};
