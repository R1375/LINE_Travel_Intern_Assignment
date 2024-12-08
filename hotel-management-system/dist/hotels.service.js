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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hotel_entity_1 = require("./entities/hotel.entity");
const csv = require("csv-parse");
const stream_1 = require("stream");
let HotelsService = class HotelsService {
    constructor(hotelsRepository) {
        this.hotelsRepository = hotelsRepository;
    }
    async create(createHotelDto) {
        const hotel = this.hotelsRepository.create(createHotelDto);
        return await this.hotelsRepository.save(hotel);
    }
    async findAll() {
        return await this.hotelsRepository.find();
    }
    async findOne(id) {
        return await this.hotelsRepository.findOneBy({ id });
    }
    async update(id, updateHotelDto) {
        await this.hotelsRepository.update(id, updateHotelDto);
        return this.findOne(id);
    }
    async importCSV(file) {
        const records = [];
        const parser = csv.parse({
            columns: true,
            skip_empty_lines: true,
        });
        return new Promise((resolve, reject) => {
            const stream = stream_1.Readable.from(file);
            stream
                .pipe(parser)
                .on('data', async (record) => {
                records.push({
                    name: record.name,
                    address: record.address,
                    email: record.email,
                    country: record.country,
                    city: record.city,
                    coordinate: `${record.longitude},${record.latitude}`,
                    status: record.is_open === 'true' ? 1 : 0,
                });
            })
                .on('end', async () => {
                try {
                    await this.hotelsRepository.save(records);
                    resolve();
                }
                catch (error) {
                    reject(new common_1.BadRequestException('Failed to import CSV data'));
                }
            })
                .on('error', (error) => {
                reject(new common_1.BadRequestException('Failed to parse CSV file'));
            });
        });
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map