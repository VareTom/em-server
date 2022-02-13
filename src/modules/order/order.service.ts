import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/core/constants';

// Entities
import { Order } from 'src/core/entities/order.entity';
import { OrderCreateInputDto } from 'src/core/dtos/order/orderCreateInputDto';
import { OrderOutputDto } from 'src/core/dtos/order/orderOutputDto';

@Injectable()
export class OrderService {
  
  constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: typeof Order
  ) {}
  
  async create(orderInput: OrderCreateInputDto): Promise<OrderOutputDto> {
    return new OrderOutputDto(null)
  }
}
