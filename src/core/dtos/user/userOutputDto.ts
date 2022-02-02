import { IsDate, IsEmail } from 'class-validator';

export class UserOutputDto {
  @IsEmail()
  email: string;

  @IsDate()
  createdAt?: Date;
  
  @IsDate()
  updatedAt?: Date;
  
  @IsDate()
  deletedAt?: Date;
}