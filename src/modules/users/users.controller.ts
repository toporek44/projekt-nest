import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('users')
@Serialize(User)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/all')
  getAll() {
    return this.usersService.getAll();
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  @Delete('deleteUser/:id')
  @ApiParam({ name: 'id', description: "Deleted user's id" })
  deleteUser(@Param() userId: string) {
    return this.usersService.delete(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'User id' })
  getUserInfo(@Param() userId: string) {
    return this.usersService.findById(userId);
  }
}
