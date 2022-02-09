import { IsDate, IsEmail, IsInstance, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTOs
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';
import { Exclude, Type } from 'class-transformer';

export class UserOutputDto {

  @ApiProperty()
  @IsString()
  uuid: string;
  
  @Exclude()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  activeEntityUuid?: string;
  
  @ApiProperty()
  @IsDate()
  createdAt?: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt?: Date;
  
  @ApiProperty()
  @IsDate()
  deletedAt?: Date;

  @ApiProperty()
  @IsInstance(EntityCreateOutputDto)
  entities?: EntityCreateOutputDto[] = [];
  
 /* constructor(partial: Partial<UserOutputDto>) {
    Object.assign(this, partial);
  }*/
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.activeEntityUuid = json.activeEntityUuid ?? null;
    this.createdAt = json.createdAt ?? null;
    this.updatedAt = json.updatedAt ?? null;
    this.deletedAt = json.deletedAt ?? null;

    if (json.userEntities && json.userEntities.length > 0) {
      json.userEntities.forEach(userEntity => {
        this.entities.push({
          uuid: userEntity.entity.uuid,
          authorUuid: userEntity.entity.authorUuid,
          name: userEntity.entity.name,
          description: userEntity.entity.description ?? null,
          createdAt: userEntity.entity.createdAt
        })
      })
    }
  }
}
