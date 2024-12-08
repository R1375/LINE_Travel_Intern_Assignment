import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Logger,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
  import { HotelsService } from '../hotels/hotels.service';
  import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('uploads')
  @Controller('uploads')
  export class UploadsController {
    private readonly logger = new Logger(UploadsController.name);
  
    constructor(private readonly hotelsService: HotelsService) {}
  
    @Post('csv')
    @ApiOperation({ summary: 'Upload CSV file containing hotel data' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(csv)$/)) {
            return callback(new BadRequestException('Only CSV files are allowed'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
        },
      }),
    )
    async uploadCsv(@UploadedFile() file: Express.Multer.File) {
      this.logger.log(`Receiving CSV upload: ${file?.originalname}`);
      
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
  
      try {
        await this.hotelsService.importCSV(file.buffer);
        return {
          message: 'CSV processed successfully',
          filename: file.originalname,
        };
      } catch (error) {
        this.logger.error('Error processing CSV:', error);
        throw new BadRequestException(error.message || 'Failed to process CSV file');
      }
    }
  }