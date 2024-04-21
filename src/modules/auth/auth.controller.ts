import { Body, Controller, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/swagger/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  })
  signIn(@Body() signInDto: User) {
    return this.authService.signIn(signInDto.username, signInDto.password);
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
  register(@Body() createUserDto: CreateUserDto): any {
    return this.authService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
    },
  })
  requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password/:token')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        newPassword: { type: 'string' },
      },
      // required: ['userId', 'newPassword'],
    },
  })
  @ApiParam({
    name: 'token',
    description: 'test',
  })
  resetPassword(
    @Body('userId') userId: string,
    @Body('newPassword') newPassword: string,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(userId, newPassword, token);
  }
}
