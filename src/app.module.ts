import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST ?? '127.0.0.1',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER ?? 'app',
      password: process.env.DATABASE_PASSWORD ?? '1234',
      database: process.env.DATABASE_NAME ?? 'testDB',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CustomerModule,
    AuthModule,
  ],
})
export class AppModule {}
