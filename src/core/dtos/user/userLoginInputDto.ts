import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginInputDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  password: string;
}