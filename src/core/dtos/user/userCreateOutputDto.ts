import { IsInstance, IsNotEmpty } from 'class-validator';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';

export class UserCreateOutputDto {
  @IsNotEmpty()
  token: string;
  
  @IsInstance(UserOutputDto)
  user: UserOutputDto;
}