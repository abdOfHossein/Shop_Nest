import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Shoping Nest.js')
  .setDescription('Shop Project With Nest.Js')
  .setVersion('1.0')
  .build();
