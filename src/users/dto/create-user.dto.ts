import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  userAvatar?: string;
}
