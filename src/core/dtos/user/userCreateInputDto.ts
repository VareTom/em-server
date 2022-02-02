import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateInputDto {
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}