import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ExpenditureUpdateInputDto {
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
}