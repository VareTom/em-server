import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

// Entities
import { Order } from 'src/core/entities/order.entity';
import { Service } from 'src/core/entities/service.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class OrderService extends Model<OrderService> {
  @ForeignKey(() => Order)
  @Column
  orderUuid: string;
  
  @ForeignKey(() => Service)
  @Column
  serviceUuid: string;
}