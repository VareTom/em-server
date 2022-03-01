import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactMailInputDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}