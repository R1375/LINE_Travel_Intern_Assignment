import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotel } from './entities/hotel.entity';
import { multerConfig } from '../config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    MulterModule.register()  // Remove specific config here
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}