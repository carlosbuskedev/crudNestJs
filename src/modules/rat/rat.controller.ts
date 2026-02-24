import { Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Body, Req } from '@nestjs/common';
import { CustomerRatDTO } from 'src/modules/rat/dto/customer-rat.dto.create';
import { RatService } from 'src/modules/rat/rat.service';
import { Controller } from '@nestjs/common';
import { RatPaginationDto } from 'src/modules/rat/dto/customer-rat.pagination-dto';
import { Query } from '@nestjs/common';

@Controller('rats')
export class RatController {
  constructor(private readonly ratService: RatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRat(@Body() customerRatDTO: CustomerRatDTO, @Req() req: any) {
    return this.ratService.createRat(
      customerRatDTO,
      customerRatDTO.customer_id,
      req.user.id,
    );
  }
  @Get()
  async list(@Query() q: RatPaginationDto) {
    const skip = q.skip ?? 0;
    const limit = q.limit ?? 20;
    return this.ratService.getAll(skip, limit);
  }
}
