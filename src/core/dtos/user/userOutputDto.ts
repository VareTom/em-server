import { IsBoolean, IsDate, IsEmail, IsInstance, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

// DTOs
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';

export class UserOutputDto {

  @ApiProperty()
  @IsUUID(4)
  uuid: string;
  
  @Exclude()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsBoolean()
  isConfirmed: boolean;
  
  @ApiProperty()
  @IsBoolean()
  isSuperAdmin: boolean;
  
  @ApiProperty()
  @IsBoolean()
  isDisabled: boolean;
  
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @ApiProperty({
    type: EntityCreateOutputDto
  })
  @IsInstance(EntityCreateOutputDto)
  entity?: EntityCreateOutputDto;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.isConfirmed = json.isConfirmed;
    this.isSuperAdmin = json.isSuperAdmin;
    this.isDisabled = json.isDisabled;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.deletedAt = json.deletedAt ?? null;

    if (json.entity) this.entity = new EntityCreateOutputDto(json.entity);
  }
}
