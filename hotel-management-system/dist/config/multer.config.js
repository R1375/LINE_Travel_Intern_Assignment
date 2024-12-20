"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            callback(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'text/csv') {
            return callback(new Error('Only CSV files are allowed'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 5242880,
    },
};
//# sourceMappingURL=multer.config.js.map