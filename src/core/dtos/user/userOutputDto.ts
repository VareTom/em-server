import { IsDate, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsDate()
  createdAt?: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt?: Date;
  
  @ApiProperty()
  @IsDate()
  deletedAt?: Date;
}