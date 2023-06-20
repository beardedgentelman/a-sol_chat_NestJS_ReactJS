import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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

    user.avatar = `data:image/png;base64,${file.buffer.toString('base64')}`;
    await this.userRepository.save(user);

    return user;
  }

  async getMe(request: Request) {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      const userId = decodedToken.id;
      const user = await this.userRepository.findOneBy({ id: userId });
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
