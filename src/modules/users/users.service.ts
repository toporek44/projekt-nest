// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
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
  ) {}


  private readonly users = [
    {
      userId: 1,
      username: 'xD',
      password: 'xD',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];


  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create({ password, username }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  // Implement additional methods as needed
}
