import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ExpenditureOutputDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  priceInCent: number;
  
  @ApiProperty()
  @IsOptional()
  boughtAt?: Date;
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.priceInCent = json.priceInCent;
    this.createdAt = json.createdAt;
    this.boughtAt = json.boughtAt;
  }
}