import { Body, Controller, HttpCode, HttpStatus, Post, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UserLoginDto } from '../users/entities/user.entity';
// import { CreateUserDto } from '../users/swagger/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  signIn(@Body() signInDto: UserLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['username', 'password', 'email'],
    },
  })
  registerUser(@Body() createUserDto: CreateUserDto): any {
    return this.authService.create(createUserDto);
  }


  @HttpCode(HttpStatus.OK)
  @Delete('deleteUser/:userId')
  @ApiParam({ name:'userId', description: 'Deleted user\'s id' })
  deleteUser(@Param() userId: string): any {
    return this.authService.delete(userId);
  }
}
