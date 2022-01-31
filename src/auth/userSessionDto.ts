import { IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class UserSessionDto {
  @IsNotEmpty()
  token: string;
  
  user: User;
}