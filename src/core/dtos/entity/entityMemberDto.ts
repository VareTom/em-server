import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class EntityMemberDto {
  @ApiProperty()
  @IsString()
  uuid: string;
  
  @Exclude()
  password: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsDate()
  addAt: Date;
  
  @ApiProperty()
  @IsDate()
  createdAt?: Date;
  
  @Exclude()
  updatedAt?: Date;
  
  @Exclude()
  deletedAt?: Date;
  
  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
  
  constructor(partial: Partial<EntityMemberDto>) {
    Object.assign(this, partial);
  }
}