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
import { Service } from 'src/core/entities/service.entity';
import { Order } from 'src/core/entities/order.entity';

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
  
  @AllowNull(true)
  @Column
  options: string;
  
  @ForeignKey(() => Address)
  @Column
  addressUuid: string;
  
 /* @HasOne(() => Address)
  address: Address;*/
  //addressUuid: string;
  
  @HasMany(() => Order)
  orders: Order[];
  
  // V1
  /*@HasMany(() => Car)
  cars: Car[];*/
}