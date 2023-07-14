import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}
