import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, User, UserLoginDto } from './entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@Serialize(User)
@UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/all')
  getAll() {
    return this.usersService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UserLoginDto })
  async signIn(@Body() signInDto: UserLoginDto, @Session() session: any) {
    const { user } = await this.authService.signIn(signInDto.email, signInDto.password);
    session.userId = user.userId;

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateUserDto })
  async registerUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const { user } = await this.authService.signUp(createUserDto);
    session.userId = user.userId;

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/delete')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('deleteUser/:id')
  @ApiParam({ name: 'id', description: "Deleted user's id" })
  deleteUser(@Param() userId: string) {
    return this.usersService.delete(userId);
  }
}
