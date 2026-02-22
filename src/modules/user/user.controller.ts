import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dto/user.dto.create';
import { UserService } from 'src/modules/user/user.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
