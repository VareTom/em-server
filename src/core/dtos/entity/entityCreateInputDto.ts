import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class EntityCreateInputDto {
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsUUID()
  authorUuid: string;
}