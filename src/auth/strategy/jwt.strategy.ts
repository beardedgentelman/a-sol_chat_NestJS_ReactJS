import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.UserService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException('You have no access');
    }

    return {
      id: user.id,
    };
  }
}
