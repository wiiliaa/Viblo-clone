import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-uset.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async find() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.find({ where: { id } });
  }

  async delete(id: number) {
    let status = true;
    const target = await this.userRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }

  async update(uesr: User, updateUserDto: UpdateUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: uesr.id })
      .execute();
  }
}
