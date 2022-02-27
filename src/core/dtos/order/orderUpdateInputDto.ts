import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class OrderUpdateInputDto {
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
}