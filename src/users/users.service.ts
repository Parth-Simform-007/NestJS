import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async createUser(email: string, password: string) {
    const userInfo = this.userRepo.create({ email, password });
    return await this.userRepo.save(userInfo);
  }

  findOne(query: FindOneOptions<UserEntity>) {
    return this.userRepo.findOne(query);
  }

  find(query: FindManyOptions<UserEntity>) {
    return this.userRepo.find(query);
  }

  async updateUser(id, att: Partial<UserEntity>) {
    const userInfo = await this.findOne({ where: { id } });
    if (!userInfo) {
      throw new NotFoundException('User Info Not Found!!');
    }
    Object.assign(userInfo, att);

    return this.userRepo.save(userInfo);
  }

  async removeUser(id: number) {
    const userInfo = await this.findOne({ where: { id } });
    if (!userInfo) {
      throw new NotFoundException('User Info Not Found!!');
    }

    return this.userRepo.remove(userInfo);
  }
}
