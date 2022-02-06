import { IsString } from 'class-validator';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';

// Entities

@Table({
  timestamps: true,
  paranoid: true,
})
export class Car extends Model<Car> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;
  
  @IsString()
  @AllowNull(false)
  @Column
  merch: string;
  
  @IsString()
  @AllowNull(false)
  @Column
  model: string;
  
  @IsString()
  @AllowNull(true)
  @Column
  year?: string;
  
  @IsString()
  @AllowNull(true)
  @Column
  color?: string;
 
  // V1
 /* @ForeignKey(() => Client)
  @Column
  ownerUuid: string;
  
  @BelongsTo(() => Client)
  owner: Client;*/
}