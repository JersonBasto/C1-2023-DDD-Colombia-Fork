import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Emergencies Context')
    .setDescription('Se encuentra el context de Emergencies')
    .setVersion('1.0')
    .addTag('emergencies')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/doc', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
