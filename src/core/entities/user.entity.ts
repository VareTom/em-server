import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsString } from 'class-validator';

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
  id: string;
  
  @IsEmail
  @AllowNull(false)
  @Unique
  @Column
  email: string
  
  @IsString()
  @AllowNull(false)
  @Column
  password: string
}