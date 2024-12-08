import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { typeOrmConfig } from '../config/typeorm.config';
import { HotelsModule } from '../hotels/hotels.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    // Configuration for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Database connection configuration
    TypeOrmModule.forRoot(typeOrmConfig),
    // Global Multer configuration for file uploads
    MulterModule.register({
      dest: './uploads',
    }),
    // Feature modules
    HotelsModule,
    UploadsModule,
  ],
})
export class AppModule {}