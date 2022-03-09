import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { IsInstance, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadInterface {
  @ApiProperty()
  @IsNotEmpty()
  @IsInstance(UserOutputDto)
  user: UserOutputDto;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  iat: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  exp: number
}