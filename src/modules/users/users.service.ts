import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './swagger/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findById(userId: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ password, username, email }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: hashedPassword, email });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.usersRepository.delete(userId)

    if (!deletedUser) {
      throw new NotFoundException;
    }
    return deletedUser
  }
}
