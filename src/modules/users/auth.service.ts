import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

interface AuthResponse {
  user: User;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ password, username, email }: CreateUserDto): Promise<AuthResponse> {
    if (await this.usersService.findByEmail(email)) {
      throw new ConflictException('User with same email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({ username, password: hashedPassword, email });
    const payload = { sub: newUser.userId, username: newUser.username };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);

    return {
      user: newUser,
      accessToken,
    };
  }
}
