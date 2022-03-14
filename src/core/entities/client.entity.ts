import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default, ForeignKey, HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { Address } from 'src/core/entities/address.entity';
import { Car } from 'src/core/entities/car.entity';
import { Order } from 'src/core/entities/order.entity';
import { Entity } from 'src/core/entities/entity.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<Client> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;
  
  @AllowNull(false)
  @Column
  firstName: string;
  
  @AllowNull(true)
  @Column
  lastName: string;
  
  @BelongsTo(() => Address)
  address: Address;
  
  @ForeignKey(() => Address)
  @Column
  addressUuid: string;
  
  @HasMany(() => Order)
  orders: Order[];
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @BelongsTo(() => Entity)
  entity: Entity;
  
  @HasMany(() => Car)
  cars: Car[];
}