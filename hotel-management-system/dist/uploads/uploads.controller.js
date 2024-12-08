"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UploadsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const hotels_service_1 = require("../hotels/hotels.service");
const swagger_1 = require("@nestjs/swagger");
let UploadsController = UploadsController_1 = class UploadsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
        this.logger = new common_1.Logger(UploadsController_1.name);
    }
    async uploadCsv(file) {
        this.logger.log(`Receiving CSV upload: ${file?.originalname}`);
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            await this.hotelsService.importCSV(file.buffer);
            return {
                message: 'CSV processed successfully',
                filename: file.originalname,
            };
        }
        catch (error) {
            this.logger.error('Error processing CSV:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to process CSV file');
        }
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('csv'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload CSV file containing hotel data' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(csv)$/)) {
                return callback(new common_1.BadRequestException('Only CSV files are allowed'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadCsv", null);
exports.UploadsController = UploadsController = UploadsController_1 = __decorate([
    (0, swagger_1.ApiTags)('uploads'),
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map