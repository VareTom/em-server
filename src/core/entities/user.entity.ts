import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default, ForeignKey,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

// Entities
import { Entity } from 'src/core/entities/entity.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;
  
  @IsEmail
  @AllowNull(false)
  @Unique
  @Column
  email: string;
  
  @IsBoolean()
  @Default(false)
  @Column
  isConfirmed: boolean;
  
  @IsBoolean()
  @Default(false)
  @Column
  isDisabled: boolean;
  
  @IsNumber()
  @Unique
  @Column
  registrationCode?: number;
  
  @IsString()
  @Column
  password: string;
  
  @IsBoolean()
  @Default(false)
  @Column
  isSuperAdmin: boolean;
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @BelongsTo(() => Entity)
  entity: Entity
}
