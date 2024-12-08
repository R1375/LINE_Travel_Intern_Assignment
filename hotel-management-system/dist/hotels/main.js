"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const logger = new common_1.Logger('Bootstrap');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use('/hotels/upload', (req, res, next) => {
            console.log('Request received at upload endpoint');
            next();
        });
        app.enableCors();
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Hotel Management API')
            .setDescription('API for managing hotel information')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(3000);
        logger.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        common_1.Logger.error(`Error starting application: ${error.message}`, 'Bootstrap');
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map