import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { HotelsService } from '../hotels/hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from '../hotels/entities/hotel.entity';

@Module({
  imports: [
    // Configure Multer specifically for this module
    MulterModule.register({
      dest: './uploads',
    }),
    // Import TypeORM features needed for hotel operations
    TypeOrmModule.forFeature([Hotel]),
  ],
  controllers: [UploadsController],
  providers: [HotelsService],
})
export class UploadsModule {}