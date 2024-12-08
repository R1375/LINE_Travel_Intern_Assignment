import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
export declare class HotelsService {
    private hotelsRepository;
    constructor(hotelsRepository: Repository<Hotel>);
    create(createHotelDto: CreateHotelDto): Promise<Hotel>;
    findAll(): Promise<Hotel[]>;
    findOne(id: number): Promise<Hotel>;
    update(id: number, updateHotelDto: CreateHotelDto): Promise<Hotel>;
    importCSV(file: Buffer): Promise<void>;
}
