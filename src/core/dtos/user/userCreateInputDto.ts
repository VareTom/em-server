import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateInputDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}