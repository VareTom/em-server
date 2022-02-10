import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EntityCreateInputDto {
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
  
  @ApiProperty()
  @IsString()
  authorUuid: string;
}