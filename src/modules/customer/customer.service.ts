import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/models/customer.entity';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto.create';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(customerDto: CustomerDto): Promise<Customer> {
    const cnpj = (customerDto.cnpj ?? '').toString().replace(/\D/g, '');

    const checkCustomer = await this.customerRepository.findOne({
      where: { cnpj: cnpj },
    });
    if (checkCustomer) {
      throw new ConflictException('Customer already exists');
    }

    const createCustomer = this.customerRepository.create({
      email: customerDto.email,
      cnpj: cnpj,
      razao_social: customerDto.razao_social,
    });

    return await this.customerRepository.save(createCustomer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
