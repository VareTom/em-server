import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EntityCreateInputDto {
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  description?: string;
  
  @ApiProperty()
  @IsString()
  authorUuid: string;
}