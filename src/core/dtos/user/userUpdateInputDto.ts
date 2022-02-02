import { IsEmail } from 'class-validator';

export class UserUpdateInputDto {
  @IsEmail()
  email: string;
}