import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddressCreateInputDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  number: number;
  
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
}