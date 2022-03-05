import {
  AllowNull, BelongsTo, BelongsToMany,
  Column,
  DataType,
  Default, ForeignKey, HasMany,
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
  @AllowNull(false)
  @Default(false)
  @Column
  isConfirmed: boolean;
  
  @IsNumber()
  @Unique
  @Column
  registrationCode: number;
  
  @IsString()
  @Column
  password: string;
  
  @IsBoolean()
  @AllowNull(false)
  @Default(false)
  @Column
  isSuperAdmin: boolean;
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @BelongsTo(() => Entity)
  entity: Entity
}
