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
  indexes: [
    { unique: true, fields: ['email'] },
    { unique: true, fields: ['registrationCode'] },
  ]
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
