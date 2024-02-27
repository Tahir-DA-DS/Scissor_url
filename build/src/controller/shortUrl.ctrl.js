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
exports.getAnalytics = exports.Genqrcode = exports.handleRedirect = exports.createShortUrl = void 0;
const shortUrl_model_1 = __importDefault(require("../model/shortUrl.model"));
const shortid_1 = __importDefault(require("shortid"));
const qr_image_1 = __importDefault(require("qr-image"));
const Analytics_model_1 = __importDefault(require("../model/Analytics.model"));
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { destination, customAlias } = req.body;
        try {
            let transformedUrl;
            if (customAlias) {
                const existingUrl = yield shortUrl_model_1.default.findOne({ shortId: customAlias });
                if (existingUrl) {
                    return res.status(400).json({ error: 'Custom alias is already in use.' });
                }
                transformedUrl = customAlias;
            }
            else {
                transformedUrl = shortid_1.default.generate();
            }
            const newUrl = new shortUrl_model_1.default({
                destination,
                transformedUrl,
            });
            yield newUrl.save();
            res.json({ transformedUrl });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.createShortUrl = createShortUrl;
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { transformedUrl } = req.params;
        const short = yield shortUrl_model_1.default.findOne({ transformedUrl }).lean();
        if (!short) {
            return res.sendStatus(404);
        }
        res.redirect(short.destination);
        yield Analytics_model_1.default.create({
            shortUrl: transformedUrl,
            timestamp: new Date(),
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
        });
        yield Analytics_model_1.default.findOneAndUpdate({ shortUrl: transformedUrl }, { $inc: { accessCount: 1 } });
    });
}
exports.handleRedirect = handleRedirect;
function Genqrcode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { transformedUrl } = req.params;
        const qrCode = qr_image_1.default.image(`http://localhost:4000/${transformedUrl}`, { type: 'png' });
        res.type('png');
        qrCode.pipe(res);
    });
}
exports.Genqrcode = Genqrcode;
function getAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { transformedUrl } = req.params;
            const analyticsData = yield Analytics_model_1.default.find({ shortUrl: transformedUrl });
            if (analyticsData.length === 0) {
                return res.status(404).json({ error: 'Analytics data not found' });
            }
            const totalAccessCount = analyticsData.reduce((total, data) => total + data.accessCount, 0);
            const response = {
                totalAccessCount,
                analyticsData
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error fetching analytics:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.getAnalytics = getAnalytics;
