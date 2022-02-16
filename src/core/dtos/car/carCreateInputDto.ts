import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CarCreateInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  merch: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;
  
  @ApiProperty()
  @IsOptional()
  year?: number;
  
  @ApiProperty()
  @IsOptional()
  color?: string;
}