import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './swagger/create-user.dto';

export const encryptToken = async (stringToEncrypt: string) => await bcrypt.hash(stringToEncrypt, 10);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ password, username, email }: CreateUserDto): Promise<User> {
    const hashedPassword = await encryptToken(password);
    const newUser = this.usersRepository.create({ username, password: hashedPassword, email });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    await this.usersRepository.update(id, { password: newPassword });
  }
}
