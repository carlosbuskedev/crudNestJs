import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dto/user.dto.create';
import { UserService } from 'src/modules/user/user.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ApiBearerAuth,ApiTags,ApiOkResponse } from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOkResponse({ description: 'user list' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
