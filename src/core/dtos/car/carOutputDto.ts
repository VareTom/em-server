import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CarOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
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
  
  constructor(json: Partial<CarOutputDto>) {
    this.uuid = json.uuid;
    this.merch = json.merch;
    this.model = json.model;
    this.year = json.year;
    this.color = json.color;
  }
}