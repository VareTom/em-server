import {
  AllowNull, BelongsToMany,
  Column,
  DataType,
  Default, HasMany,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsString } from 'class-validator';

// Entities
import { UserEntity } from 'src/core/entities/user-entity.entity';

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
  
  @IsString()
  @AllowNull(false)
  @Column
  password: string;
  
  @HasMany(() => UserEntity)
  userEntities: UserEntity[];
}
