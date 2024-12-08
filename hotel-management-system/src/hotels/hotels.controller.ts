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
  Logger
 } from '@nestjs/common';
 import { FileInterceptor } from '@nestjs/platform-express';
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
  @ApiOperation({ summary: 'Import hotels from CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'CSV file containing hotel data',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5242880 }, // 5MB
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.debug('Upload request received');
    this.logger.debug('File metadata:', {
      fieldname: file?.fieldname,
      originalname: file?.originalname,
      mimetype: file?.mimetype,
      size: file?.size,
      buffer: file?.buffer?.length
    });
 
    if (!file?.buffer) {
      this.logger.error('No file provided in request');
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }
 
    try {
      const result = await this.hotelsService.importCSV(file.buffer);
      this.logger.log('File processed successfully');
      return { 
        message: 'File uploaded and processed successfully',
        filename: file.originalname,
        recordsProcessed: Array.isArray(result) ? result.length : 0
      };
    } catch (error) {
      this.logger.error('Error processing file:', error);
      throw new HttpException(
        error.message || 'Failed to process file',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
 
  @Get(':id')
  @ApiOperation({ summary: 'Get hotel by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotelsService.findOne(id);
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