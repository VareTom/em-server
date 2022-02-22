import { HttpException, HttpService, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op, or } from 'sequelize';

// Constants
import { CLIENT_REPOSITORY, ORDER_REPOSITORY, SERVICE_REPOSITORY } from 'src/core/constants';

// Entities
import { Order } from 'src/core/entities/order.entity';
import { Service } from 'src/core/entities/service.entity';
import { Client } from 'src/core/entities/client.entity';

// DTOs
import { OrderCreateInputDto } from 'src/core/dtos/order/orderCreateInputDto';
import { OrderOutputDto } from 'src/core/dtos/order/orderOutputDto';

@Injectable()
export class OrderService {
  
  constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: typeof Order,
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: typeof Service,
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: typeof Client
  ) {}
  
  async create(orderInput: OrderCreateInputDto): Promise<OrderOutputDto> {
    const services = await this.serviceRepository.findAll({
      where: {
        uuid: { [Op.in]: orderInput.servicesUuid }
      }
    });
    if (services.length <= 0) throw new HttpException('Cannot retrieve services to associate', HttpStatus.BAD_REQUEST);
    
    const client = await this.clientRepository.findByPk(orderInput.clientUuid);
    if (!client) throw new HttpException('Cannot retrieve client', HttpStatus.BAD_REQUEST);
  
    const totalInCent = services.reduce((partialSum, a) => partialSum + a.priceInCent, 0)
    
    const orderCreationInput = {
      ...orderInput,
      totalInCent: totalInCent
    }
    const order = await this.orderRepository.create(orderCreationInput);
    if (!order) throw new HttpException('Cannot create order', HttpStatus.BAD_REQUEST);
    
    await order.$add('services', services);
    order.services = services;
    order.client = client;
    
    return new OrderOutputDto(order)
  }
  
  async findAllForEntity(entityUuid: string): Promise<OrderOutputDto[]> {
    const orders = await this.orderRepository.findAll({
      include: [
        {
          model: Client
        },
        {
          model: Service
        }
      ]
    })
    if (orders.length < 0) throw new HttpException('Cannot retrieve orders', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return orders.map(order => new OrderOutputDto(order));
  }
}
