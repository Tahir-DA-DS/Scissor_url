import mongoose, { Document } from 'mongoose';
import { ShortUrl } from '../model/shortUrl.model';
import { number } from 'yup';

export interface Analytics extends Document {
    shortUrl: ShortUrl['_id'];
    timestamp: Date;
    ipAddress: string;
    userAgent: string;
    accessCount: number;
    
}

const analyticsSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        ref: 'ShortUrl',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    accessCount: {
        type: Number,
        default: 0, // Initialize access count to 0
    },
    
}, { timestamps: true });


const AnalyticsModel = mongoose.model<Analytics>('Analytics', analyticsSchema);

export default AnalyticsModel;

