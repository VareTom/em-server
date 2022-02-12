import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ServiceCreateInputDto {
  
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
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  entityUuid: string;
}