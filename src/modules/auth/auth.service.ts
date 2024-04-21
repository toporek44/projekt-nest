import { Body, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/swagger/create-user.dto';
import { generateToken, sendPasswordResetEmail } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create({ password, username, email }: CreateUserDto): Promise<User> {
    const newUser = this.usersService.create({ username, password, email });

    return newUser;
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const token = generateToken();
      await sendPasswordResetEmail(email, token);
      return { email, token, message: 'Password reset email sent successfully' };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  decodeToken(token: string): { userId: number } {
    try {
      // Decode the token and extract user ID
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as { userId: number };
      return decoded;
    } catch (error) {
      // If decoding fails (e.g., due to invalid token), throw an error
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getUserIdFromToken(token: string): Promise<number> {
    const decodedToken = this.decodeToken(token); // You need to implement this function
    return decodedToken.userId;
  }

  async resetPassword(userId: string, newPassword: string, token: string) {
    const user = await this.usersService.findOne(userId);
    console.log(user);
    const isValidToken = user && (await this.verifyToken(token, user?.password));
    if (isValidToken) {
      const userId = await this.getUserIdFromToken(token); // You need to implement this function
      await this.usersService.updatePassword(userId, newPassword);
      return { message: 'Password reset successful' };
    } else {
      // Token is invalid or expired
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  async verifyToken(token: string, tokenToCompare: string) {
    console.log(token, tokenToCompare);
    return await bcrypt.compare(token, tokenToCompare);
  }
}
