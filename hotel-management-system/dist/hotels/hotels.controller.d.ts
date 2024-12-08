import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
export declare class HotelsController {
    private readonly hotelsService;
    private readonly logger;
    constructor(hotelsService: HotelsService);
    findAll(): Promise<import("./entities/hotel.entity").Hotel[]>;
    create(createHotelDto: CreateHotelDto): Promise<import("./entities/hotel.entity").Hotel>;
    uploadFile(file: Express.Multer.File): Promise<void>;
    update(id: number, updateHotelDto: CreateHotelDto): Promise<import("./entities/hotel.entity").Hotel>;
}
