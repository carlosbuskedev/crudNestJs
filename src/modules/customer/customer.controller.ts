import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from 'src/modules/customer/customer.service';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto.create';
import { Customer } from 'src/models/customer.entity';
import { Body, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Customer created successfully' })
  async create(@Body() customerDto: CustomerDto): Promise<Customer> {
    return await this.customerService.createCustomer(customerDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.customerService.getAllCustomers();
  }
}
