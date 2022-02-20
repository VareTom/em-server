import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInstance, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EntityMemberDto } from 'src/core/dtos/entity/entityMemberDto';

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
  
  @ApiProperty({
    type: EntityMemberDto,
    isArray: true
  })
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
