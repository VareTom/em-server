import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  plate: string;
  
  @ApiProperty()
  @IsOptional()
  year?: number;
  
  @ApiProperty()
  @IsOptional()
  color?: string;
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  @ApiProperty()
  @IsOptional()
  deletedAt?: Date;
  
  constructor(json: Partial<CarOutputDto>) {
    this.uuid = json.uuid;
    this.merch = json.merch;
    this.model = json.model;
    this.year = json.year;
    this.color = json.color;
    this.plate = json.plate;
    this.createdAt = json.createdAt;
    this.deletedAt = json.deletedAt;
  }
}