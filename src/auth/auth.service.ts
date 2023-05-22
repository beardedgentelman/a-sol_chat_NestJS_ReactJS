import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<CreateUserDto | null> {
    const user = await this.usersService.findByEmail(email);

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

  async register(dto: CreateUserDto) {
    try {
      const password = encodePassword(dto.password);
      const userData = await this.usersService.create({ ...dto, password });

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException(
        'Oops... something goes wrong. Registration error.',
      );
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}