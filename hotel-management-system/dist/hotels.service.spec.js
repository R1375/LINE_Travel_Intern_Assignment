"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const hotels_service_1 = require("./hotels.service");
const hotel_entity_1 = require("./entities/hotel.entity");
describe('HotelsService', () => {
    let service;
    let mockRepository;
    beforeEach(async () => {
        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                hotels_service_1.HotelsService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(hotel_entity_1.Hotel),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(hotels_service_1.HotelsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a hotel', async () => {
            const hotelDto = {
                name: 'Test Hotel',
                address: 'Test Address',
                email: 'test@test.com',
                status: 1,
                coordinate: '120.332,25.252',
                country: 'Taiwan',
                city: 'Taipei'
            };
            mockRepository.create.mockReturnValue(hotelDto);
            mockRepository.save.mockResolvedValue(Object.assign({ id: 1 }, hotelDto));
            const result = await service.create(hotelDto);
            expect(result).toEqual(Object.assign({ id: 1 }, hotelDto));
        });
    });
});
//# sourceMappingURL=hotels.service.spec.js.map