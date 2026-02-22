import { DocumentBuilder} from '@nestjs/swagger';

export const configSwegger = new DocumentBuilder()
  .setTitle('User example')
    .setDescription('API description')
    .setVersion('1.0')
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