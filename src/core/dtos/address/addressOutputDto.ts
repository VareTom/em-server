import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddressOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;
  
  @ApiProperty()
  @IsOptional()
  box?: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locality: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.street = json.street;
    this.box = json.box;
    this.postalCode = json.postalCode;
    this.locality = json.locality;
    this.country = json.country;
    this.createdAt = json.createdAt;
  }
}