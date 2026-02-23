import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/models/customer.entity';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto.create';
import { ConflictException } from '@nestjs/common';
import { CustomerPaginationDto } from 'src/modules/customer/dto/customer.pagination-dto';
import { NotFoundException } from '@nestjs/common';

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

  async getAllCustomers(
    customerPaginationDto: CustomerPaginationDto,
  ): Promise<Customer[]> {
    const defaultPageSize = 5;

    return this.customerRepository.find({
      skip: customerPaginationDto.skip ?? 0,
      take: customerPaginationDto.limit ?? defaultPageSize,
    });
  }

  async getCustomerById(id: number): Promise<Customer> {
    const findCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!findCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return findCustomer;
  }

  async deleteCustomer(id: number): Promise<void> {
    const findCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!findCustomer) {
      throw new NotFoundException('Customer not found');
    }
    await this.customerRepository.remove(findCustomer);
  }

  async changeCustomer(
    id: number,
    customerDto: CustomerDto,
  ): Promise<Customer> {
    const findCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!findCustomer) {
      throw new NotFoundException('Customer not found');
    }
    if (customerDto.email !== undefined) {
      findCustomer.email = customerDto.email;
    }
    if (customerDto.cnpj !== undefined) {
      findCustomer.cnpj = (customerDto.cnpj ?? '')
        .toString()
        .replace(/\D/g, '');
    }
    if (customerDto.razao_social !== undefined) {
      findCustomer.razao_social = customerDto.razao_social;
    }
    return await this.customerRepository.save(findCustomer);
  }
}
