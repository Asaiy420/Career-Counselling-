import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    permissions: {
        type: [String],
        default: ['read'],
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;