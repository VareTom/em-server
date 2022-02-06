import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey, HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsNumber, IsString } from 'class-validator';

// Entities
import { Entity } from 'src/core/entities/entity.entity';
import { Order } from 'src/core/entities/order.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Service extends Model<Service> {
  
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
  name: string;
  
  @IsString()
  @AllowNull(true)
  @Column
  description?: string;
  
  @IsString()
  @AllowNull(false)
  @Column
  code: string;
  
  @IsNumber()
  @AllowNull(false)
  @Column
  priceInCent: number
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @BelongsTo(() => Entity)
  entity: Entity
  
 /* @HasMany(() => Order)
  orders?: Order[]*/
}