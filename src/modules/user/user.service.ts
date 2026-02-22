import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
import { UserDto } from 'src/modules/user/dto/user.dto.create';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async createUser(createUserDto: UserDto): Promise<string> {
    const checkUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (!checkUser) {
      const hashPassword = await bcrypt.hash(
        createUserDto.password + this.getPepper(),
        this.getRounds(),
      );

      const createNewUser = this.userRepository.create({
        email: createUserDto.email,
        password: hashPassword,
      });

      await this.userRepository.save(createNewUser);
      return createNewUser.email;
    } else {
      throw new ConflictException('User already exists');
    }
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public getPepper(): string {
    return process.env.BCRYPT_PEPPER ?? '';
  }

  public getRounds(): number {
    return Number(process.env.BCRYPT_ROUNDS ?? 12);
  }
}
