import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Express } from 'express';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    create(createHotelDto: CreateHotelDto): Promise<import("./entities/hotel.entity").Hotel>;
    findAll(): Promise<import("./entities/hotel.entity").Hotel[]>;
    findOne(id: number): Promise<import("./entities/hotel.entity").Hotel>;
    update(id: number, updateHotelDto: CreateHotelDto): Promise<import("./entities/hotel.entity").Hotel>;
    importCSV(file: Express.Multer.File): Promise<void>;
}
