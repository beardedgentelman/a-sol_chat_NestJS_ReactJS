import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(email: string, userDto: CreateUserDto): Promise<UserEntity> {
    const userEmail = await this.userRepository.findOneBy({
      email,
    });

    if (userEmail) {
      throw new ConflictException('A user with this email already exist!');
    }
    const newUser = await this.userRepository.save(userDto);
    return await this.userRepository.findOneBy({ id: newUser.id });
  }

  async updateOne(id: number, userDto: UserEntity) {
    return this.userRepository.update(id, userDto);
  }

  async uploadFile(file: Express.Multer.File, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });

    user.userAvatar = `data:image/png;base64,${file.buffer.toString('base64')}`;
    await this.userRepository.save(user);

    return user;
  }
}
