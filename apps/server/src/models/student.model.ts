import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        educationLevel: {
            type: String,
            required: true,
        },
        interests: {
            type: [String],
            default: [],
        },
        skills: {
            type: [String],
            default: [],
        },
    }, {timestamps: true});