import { IsNotEmpty } from 'class-validator';
import { User } from 'src/core/entities/user.entity';

export class UserSessionDto {
  @IsNotEmpty()
  token: string;
  
  user: User;
}