import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateInputDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}