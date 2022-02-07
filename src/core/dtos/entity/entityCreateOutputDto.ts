import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class EntityCreateOutputDto {
  
  @ApiProperty()
  @IsString()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  description?: string;
  
  @ApiProperty()
  @IsString()
  authorUuid: string;
  
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
  
  // members?? user without entites -> redundant
  /*@ApiProperty()
  @IsInstance()
  isAdmin: boolean;*/
}
