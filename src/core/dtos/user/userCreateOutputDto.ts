import { IsInstance, IsJWT, IsNotEmpty } from 'class-validator';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateOutputDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  token: string;
  
  @ApiProperty({
    type: UserOutputDto
  })
  @IsInstance(UserOutputDto)
  @IsNotEmpty()
  user: UserOutputDto;
}