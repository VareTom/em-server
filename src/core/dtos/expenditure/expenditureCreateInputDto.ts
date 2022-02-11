import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ExpenditureCreateInputDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  priceInCent: number;
  
  @ApiProperty()
  @IsOptional()
  boughtAt?: Date;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  entityUuid: string;
}