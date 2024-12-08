import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Hotel } from '../hotels/entities/hotel.entity';

// 確保環境變數被正確載入
dotenv.config();

// 資料庫設定檔案
export const typeOrmConfig: TypeOrmModuleOptions = {
  // 基本連線設定
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',     // 提供預設值以防環境變數未設定
  port: parseInt(process.env.DB_PORT) || 3306,  // 使用預設的 MySQL 埠號
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'hotel_db',

  // 實體檔案設定
  entities: [Hotel],  // 自動尋找所有實體檔案
  
  // 資料庫同步設定
  synchronize: process.env.NODE_ENV !== 'production',  // 只在開發環境啟用自動同步
  
  // 連線池設定，可提升應用程式效能
  extra: {
    connectionLimit: 10,  // 設定最大連線數
  },

  // Improved error handling
  retryAttempts: 3,
  retryDelay: 3000,
  keepConnectionAlive: true,
  autoLoadEntities: true,
  
  // 開發時的除錯設定
  logging: true,
  logger: 'advanced-console',
  
  // 效能最佳化設定
  cache: {
    duration: 30000,  // 快取持續時間（毫秒）
  },
};