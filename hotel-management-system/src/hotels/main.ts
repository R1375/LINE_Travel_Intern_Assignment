import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);
    
    // Enable validation
    app.useGlobalPipes(new ValidationPipe());
    
    // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('Hotel Management API')
      .setDescription('API for managing hotel information')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    await app.listen(3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    Logger.error(`Error starting application: ${error.message}`, 'Bootstrap');
    process.exit(1);
  }
}
bootstrap();
