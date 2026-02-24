import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerRat } from 'src/models/customer-rat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRatDTO } from 'src/modules/rat/dto/customer-rat.dto.create';
import { RatPaginationDto } from 'src/modules/rat/dto/customer-rat.pagination-dto';

@Injectable()
export class RatService {
  constructor(
    @InjectRepository(CustomerRat)
    private readonly ratRepository: Repository<CustomerRat>,
  ) {}

  async createRat(
    customerRatDTO: CustomerRatDTO,
    customerId: number,
    userId: number,
  ) {
    const rat = this.ratRepository.create({
      description: customerRatDTO.description,
      price: customerRatDTO.price,
      createdBy: { id: userId } as any,
      customer: { id: customerId } as any,
    });
    return this.ratRepository.save(rat);
  }

  async getAll(skip = 0, limit = 20) {
    const qb = this.ratRepository
      .createQueryBuilder('cr')
      .innerJoin('cr.customer', 'c')
      .innerJoin('cr.createdBy', 'u')
      .leftJoin('u.user_profile', 'up')
      .select([
        'cr.id AS id',
        'cr.description AS description',
        'cr.price AS price',
        'cr.created_at AS created_at',
        'cr.updated_at AS updated_at',
        'c.id AS customer_id',
        'c.razao_social AS customer_razao_social',
        'c.cnpj AS customer_cnpj',
        'u.id AS created_by_user_id',
        'u.email AS created_by_email',
        'up.full_name AS created_by_full_name',
      ])
      .orderBy('cr.created_at', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await Promise.all([
      qb.getRawMany(),
      qb.clone().skip(undefined).take(undefined).getCount(),
    ]);

    return { data, total, skip, limit };
  }
}
