import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ServiceUpdateInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsOptional()
  code?: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  priceInCent: number;
}