import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class StatisticsOutputDto {
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalExpendituresInCent: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalIncomes: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  actualIncomes: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  benefits: number;
  
  constructor(json: any) {
    this.totalExpendituresInCent = json.totalExpendituresInCent;
    this.totalIncomes = json.totalIncomes;
    this.actualIncomes = json.actualIncomes;
    this.benefits = json.benefits;
  }
}