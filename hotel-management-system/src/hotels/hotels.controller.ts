import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Param, 
  Body, 
  UploadedFile, 
  UseInterceptors, 
  ParseIntPipe, 
  HttpException, 
  HttpStatus,
  Logger,
  BadRequestException
 } from '@nestjs/common';
 import { FileInterceptor } from '@nestjs/platform-express';
 import { memoryStorage } from 'multer';
 import { HotelsService } from './hotels.service';
 import { CreateHotelDto } from './dto/create-hotel.dto';
 import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
 import { Express } from 'express';
 
 @ApiTags('hotels')
 @Controller('hotels')
 export class HotelsController {
  private readonly logger = new Logger(HotelsController.name);
 
  constructor(private readonly hotelsService: HotelsService) {}
 
  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  findAll() {
    return this.hotelsService.findAll();
  }
 
  @Post()
  @ApiOperation({ summary: 'Create a new hotel' })
  create(@Body() createHotelDto: CreateHotelDto) {
    
    return this.hotelsService.create(createHotelDto);
  }
 
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('File received:', file?.originalname);
    
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    return this.hotelsService.importCSV(file.buffer);
  }

  
 
  @Put(':id')
  @ApiOperation({ summary: 'Update hotel information' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHotelDto: CreateHotelDto,
  ) {
    return this.hotelsService.update(id, updateHotelDto);
  }
 }