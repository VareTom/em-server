import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export class EntityMemberDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
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