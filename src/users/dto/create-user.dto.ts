import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
