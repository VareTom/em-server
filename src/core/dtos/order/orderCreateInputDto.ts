import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class OrderCreateInputDto {
  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  durationInMinute?: number;
  
  @ApiProperty()
  @IsOptional()
  performedAt?: Date;
  
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  servicesUuid: string[];
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  clientUuid: string;
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  entityUuid: string;
}