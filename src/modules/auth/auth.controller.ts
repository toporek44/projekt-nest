import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, User, UserLoginDto } from '../users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(User)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UserLoginDto })
  signIn(@Body() signInDto: UserLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateUserDto })
  registerUser(@Body() createUserDto: CreateUserDto): any {
    return this.authService.signUp(createUserDto);
  }
}
