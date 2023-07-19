import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Tạo DocumentBuilder để cấu hình Swagger
  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog API')
    .setVersion('1.0')
    .build();

  // Tạo document từ DocumentBuilder
  const document = SwaggerModule.createDocument(app, options);

  // Cấu hình Swagger UI và serve tài liệu API tại đường dẫn /api
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
