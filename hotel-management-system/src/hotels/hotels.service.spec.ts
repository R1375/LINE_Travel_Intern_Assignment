import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HotelsService } from './hotels.service';
import { Hotel } from './entities/hotel.entity';

describe('HotelsService', () => {
  let service: HotelsService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        {
          provide: getRepositoryToken(Hotel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
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
      mockRepository.save.mockResolvedValue({ id: 1, ...hotelDto });

      const result = await service.create(hotelDto);
      expect(result).toEqual({ id: 1, ...hotelDto });
    });
  });
});