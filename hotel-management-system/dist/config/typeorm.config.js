"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
const hotel_entity_1 = require("../hotels/entities/hotel.entity");
dotenv.config();
exports.typeOrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'hotel_db',
    entities: [hotel_entity_1.Hotel],
    synchronize: process.env.NODE_ENV !== 'production',
    extra: {
        connectionLimit: 10,
    },
    retryAttempts: 3,
    retryDelay: 3000,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    logging: true,
    logger: 'advanced-console',
    cache: {
        duration: 30000,
    },
};
//# sourceMappingURL=typeorm.config.js.map