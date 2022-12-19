import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './config/swagger/swagger.config';
import { AppModule } from './modules/app/app.module';

const logger = new Logger('main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log(`Server Is Running On Port: ${port}`);
  });
  logger.log(`App Is Running On: ${process.env.HOST}:${process.env.PORT}/api`);
}
bootstrap();
