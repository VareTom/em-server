import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ServiceOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsOptional()
  priceInCent: string;
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description;
    this.priceInCent = json.priceInCent;
    this.createdAt = json.createdAt;
  }
}