import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'text/csv') {
      return callback(new Error('Only CSV files are allowed'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5242880, // 5MB
  },
};