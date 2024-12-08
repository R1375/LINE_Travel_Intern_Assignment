import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import * as csv from 'csv-parse';
import { Readable } from 'stream';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelsRepository.create(createHotelDto);
    return await this.hotelsRepository.save(hotel);
  }

  async findAll(): Promise<Hotel[]> {
    return await this.hotelsRepository.find();
  }

  async findOne(id: number): Promise<Hotel> {
    try {
      const hotel = await this.hotelsRepository.findOneBy({ id });
      if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${id} not found`);
      }
      return hotel;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error retrieving hotel');
    }
  }

  async update(id: number, updateHotelDto: CreateHotelDto): Promise<Hotel> {
    await this.hotelsRepository.update(id, updateHotelDto);
    return this.findOne(id);
  }

  async importCSV(file: Buffer): Promise<void> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const records = [];
    const parser = csv.parse({
      columns: true,
      skip_empty_lines: true,
    });

    return new Promise((resolve, reject) => {
      const stream = Readable.from(file);
      stream
        .pipe(parser)
        .on('data', (record) => {
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
            if (records.length === 0) {
              throw new BadRequestException('CSV file is empty');
            }
            await this.hotelsRepository.save(records);
            resolve();
          } catch (error) {
            reject(new BadRequestException(error.message || 'Failed to import CSV data'));
          }
        })
        .on('error', (error) => {
          reject(new BadRequestException('Failed to parse CSV file'));
        });
    });
  }
}