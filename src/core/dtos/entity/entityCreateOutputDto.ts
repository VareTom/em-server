import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInstance, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EntityMemberDto } from 'src/core/dtos/entity/entityMemberDto';
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';

export class EntityCreateOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsUUID()
  authorUuid: string;
  
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  
  @ApiProperty()
  @IsOptional()
  deletedAt?: Date;
  
  constructor(json: Partial<EntityCreateOutputDto>) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description ?? null;
    this.authorUuid = json.authorUuid;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.deletedAt = json.deletedAt;
  }
}
