import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default, ForeignKey,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsString } from 'class-validator';

// Entities
import { Client } from 'src/core/entities/client.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Address extends Model<Address> {
  
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
  street: string;
  
  @IsString()
  @AllowNull(true)
  @Column
  box: string;
  
  @IsString()
  @AllowNull(false)
  @Column
  number: number;
  
  @IsString()
  @AllowNull(false)
  @Column
  locality: string;
  
  @IsString()
  @AllowNull(false)
  @Column
  country: string;
  
  @HasOne(() => Client)
  client?: Client;
}