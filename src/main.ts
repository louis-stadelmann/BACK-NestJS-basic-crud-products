import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //App protection to avoid the brute force XSS
  app.use(helmet());

  // Allow to compress the body response through Gzip
  app.use(compression());

  // Swagger configuration
  // http://localhost:4000/api
  const config = new DocumentBuilder()
    .setTitle('Baback product API')
    .setDescription('This swagger describe the baback product API')
    .setVersion('1.0')
    .addTag('baback')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`);
  });
}

bootstrap();
