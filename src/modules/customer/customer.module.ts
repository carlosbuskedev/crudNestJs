import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { CustomerService } from 'src/modules/customer/customer.service';
import { CustomerController } from 'src/modules/customer/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  exports: [TypeOrmModule, CustomerService],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
