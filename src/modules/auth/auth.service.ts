import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from '../users/entities/user.entity';
// import { CreateUserDto } from '../users/swagger/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ password, username, email }: CreateUserDto): Promise<User> {
    if (await this.usersService.findByEmail(email)) {
      throw new ConflictException('User with same email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersService.create({ username, password: hashedPassword, email });

    return newUser;
  }
}
