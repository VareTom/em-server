import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInstance, IsString } from 'class-validator';
import { EntityMemberDto } from 'src/core/dtos/entity/entityMemberDto';

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
  @IsInstance(EntityMemberDto)
  members?: EntityMemberDto[];
  
  constructor(json: Partial<EntityCreateOutputDto>) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description ?? null;
    this.authorUuid = json.authorUuid;
    this.createdAt = json.createdAt;
    
    if (json.members && json.members.length > 0) {
      this.members = json.members.map(member => new EntityMemberDto(member));
    }
  }
}
