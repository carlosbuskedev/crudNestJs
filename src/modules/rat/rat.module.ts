import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRat } from 'src/models/customer-rat.entity';
import { RatService } from 'src/modules/rat/rat.service';
import { RatController } from 'src/modules/rat/rat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRat])],
  exports: [TypeOrmModule, RatService],
  providers: [RatService],
  controllers: [RatController],
})
export class RatModule {}
