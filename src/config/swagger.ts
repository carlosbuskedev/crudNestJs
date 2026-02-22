import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('API NestJS - Auth & Users')
  .setDescription('API RESTful para gerenciamento de usuários e autenticação JWT')
  .setVersion('1.0')
  .addTag('auth')
  .addTag('users')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'access-token',
  )
  .build();