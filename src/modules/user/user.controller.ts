import { Body, Controller, Delete, Get, Post, UseGuards, Param, HttpCode, Patch, ParseIntPipe } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dto/user.dto.create';
import { UserService } from 'src/modules/user/user.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';



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

  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id:number){
    return this.userService.getUserById(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number):Promise<void>{
    return this.userService.deleteUser(id);
  }

  
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe)id:number,
    @Body()userDto:UserDto
  ):Promise<UserDto>{
    return this.userService.changeUser(id,userDto);
  }

}

