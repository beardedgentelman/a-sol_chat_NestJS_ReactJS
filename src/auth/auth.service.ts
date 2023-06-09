import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<CreateUserDto | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user) {
      const matched = comparePasswords(password, user.password);
      if (matched) {
        console.log('Validation success!');
        return user;
      } else {
        console.log('Validation failed!');
        return null;
      }
    }
    console.log('Validation failed!');
    return null;
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    try {
      const password = encodePassword(userDto.password);
      const email = userDto.email;
      const userData = await this.usersService.create(email, {
        ...userDto,
        password,
      });

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async login(userDto: CreateUserDto) {
    const { email } = userDto;
    const user = await this.userRepository.findOneBy({ email: email });
    return {
      token: await this.jwtService.signAsync({ id: user.id }),
    };
  }
}
