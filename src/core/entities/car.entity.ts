import { IsString } from 'class-validator';
import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default, ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';

// Entities
import { Client } from 'src/core/entities/client.entity';

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
  @Column
  year?: string;
  
  @IsString()
  @Column
  color?: string;
  
  @ForeignKey(() => Client)
  @Column
  ownerUuid: string;
  
  @BelongsTo(() => Client)
  owner: Client;
}