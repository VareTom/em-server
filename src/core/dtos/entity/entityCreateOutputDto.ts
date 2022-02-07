import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInstance, IsString } from 'class-validator';

// Entities
import { User } from 'src/core/entities/user.entity';

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
}
