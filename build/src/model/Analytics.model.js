"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const analyticsSchema = new mongoose_1.default.Schema({
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
const AnalyticsModel = mongoose_1.default.model('Analytics', analyticsSchema);
exports.default = AnalyticsModel;
