import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from '../users/entities/user.entity';
// import { CreateUserDto } from '../users/swagger/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

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

  async create({ password, username, email }: CreateUserDto): Promise<User> {
    const newUser = this.usersService.create({ username, password, email });

    return newUser;
  }

  async delete(userId: string) {
    const deletedUser = this.usersService.delete(userId)

    return deletedUser;
  }
}
