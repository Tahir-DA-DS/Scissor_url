"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementAccessCount = void 0;
const shortUrl_model_1 = __importDefault(require("../model/shortUrl.model"));
function incrementAccessCount(transformedUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const urlDoc = yield shortUrl_model_1.default.findOneAndUpdate({ transformedUrl }, { $inc: { accessCount: 1 } }, { new: true });
            if (!urlDoc) {
                throw new Error('Shortened URL not found');
            }
            return (`url_access_count : ${urlDoc.accessCount}`);
        }
        catch (error) {
            console.error('Error incrementing access count:', error);
            throw error;
        }
    });
}
exports.incrementAccessCount = incrementAccessCount;
