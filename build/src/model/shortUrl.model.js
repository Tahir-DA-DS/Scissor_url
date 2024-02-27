"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    destination: { type: String, required: true },
    transformedUrl: { type: String, required: true, unique: true },
    accessCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() }
});
const ShortUrlModel = mongoose_1.default.model("ShortUrl", schema);
exports.default = ShortUrlModel;
