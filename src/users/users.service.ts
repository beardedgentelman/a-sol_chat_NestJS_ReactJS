import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
