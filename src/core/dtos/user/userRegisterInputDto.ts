import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRegisterInputDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  password: string;
  
  @ApiProperty()
  @IsNumber()
  code: number;
}