import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from '../config/typeorm.config';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    HotelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}