import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(userId: string): Promise<User | null> {
    if (!userId) {
      return null;
    }

    return this.usersRepository.findOne({ where: { userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }

    return this.usersRepository.findOne({ where: { email } });
  }

  async getAll(): Promise<User[] | null> {
    return this.usersRepository.find();
  }

  async create({ password, username, email }: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({ username, password, email });
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.usersRepository.delete(userId);

    if (!deletedUser) {
      throw new NotFoundException('user not found');
    }

    return deletedUser;
  }
}
