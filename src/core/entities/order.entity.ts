import {
  AllowNull, BelongsTo, BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey, HasMany, IsDate,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';

// Entities
import { Client } from 'src/core/entities/client.entity';
import { Service } from 'src/core/entities/service.entity';
import { IsNumber } from 'class-validator';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Order extends Model<Order> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;
  
  @IsNumber()
  @AllowNull(true)
  @Column
  duration?: number;
  
  @IsDate
  @AllowNull(true)
  @Column
  performedAt?: Date;
  
  @IsDate
  @AllowNull(true)
  @Column
  validatedAt?: Date;
  
  /*@HasMany(() => Service)
  services: Service[]; // TODO:: N-N with order*/
  
  @ForeignKey(() => Client)
  @Column
  clientUuid: string;
  
  @BelongsTo(() => Client)
  client: Client;
}