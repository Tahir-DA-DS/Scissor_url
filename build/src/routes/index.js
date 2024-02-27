"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortUrl_ctrl_1 = require("../controller/shortUrl.ctrl");
const validate_resource_1 = __importDefault(require("../middleware/validate.resource"));
function routes(app) {
    app.post('/api/url', (0, validate_resource_1.default)(), shortUrl_ctrl_1.createShortUrl);
    app.get("/:transformedUrl", shortUrl_ctrl_1.handleRedirect);
    app.get('/analytics/:transformedUrl', shortUrl_ctrl_1.getAnalytics);
    app.get('/qr/:transformedUrl', shortUrl_ctrl_1.Genqrcode);
}
exports.default = routes;
