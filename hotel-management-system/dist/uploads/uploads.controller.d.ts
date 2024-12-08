import { HotelsService } from '../hotels/hotels.service';
export declare class UploadsController {
    private readonly hotelsService;
    private readonly logger;
    constructor(hotelsService: HotelsService);
    uploadCsv(file: Express.Multer.File): Promise<{
        message: string;
        filename: string;
    }>;
}
