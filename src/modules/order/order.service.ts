import { HttpException, HttpService, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op, or } from 'sequelize';

// Constants
import { CLIENT_REPOSITORY, DATE_REFERENCE, ORDER_REPOSITORY, SERVICE_REPOSITORY } from 'src/core/constants';

// Entities
import { Order } from 'src/core/entities/order.entity';
import { Service } from 'src/core/entities/service.entity';
import { Client } from 'src/core/entities/client.entity';

// DTOs
import { OrderCreateInputDto } from 'src/core/dtos/order/orderCreateInputDto';
import { OrderOutputDto } from 'src/core/dtos/order/orderOutputDto';
import { OrderUpdateInputDto } from 'src/core/dtos/order/orderUpdateInputDto';
import { FiltersPeriodEnum } from 'src/core/enums/filters-period.enum';

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
  
  async findAllForEntity(entityUuid: string, period: FiltersPeriodEnum): Promise<OrderOutputDto[]> {
    let periodClause;
    if (period === FiltersPeriodEnum.ALL_TIME) periodClause = DATE_REFERENCE;
    if (period === FiltersPeriodEnum.MONTHLY) {
      const date = new Date(), y = date.getFullYear(), m = date.getMonth();
      periodClause = new Date(y, m, 2);
    }
    
    const orders = await this.orderRepository.findAll({
      where: {
        entityUuid: entityUuid,
        createdAt: {[Op.gte]: periodClause}
      },
      include: [ Client, Service ]
    })
    if (orders.length < 0) throw new HttpException('Cannot retrieve orders', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return orders.map(order => new OrderOutputDto(order));
  }
  
  async getByUuid(uuid: string): Promise<OrderOutputDto> {
    const order = await this.orderRepository.findOne({
      where: {
        uuid: uuid
      },
      include: [ Client, Service ]
    })
      .catch(err => {
        throw new HttpException('Cannot retrieve this order', HttpStatus.INTERNAL_SERVER_ERROR);
      })
    if (!order) throw new HttpException('Cannot retrieve this order', HttpStatus.BAD_REQUEST);
  
    return new OrderOutputDto(order);
  }
  
  async validate(orderUuid: string): Promise<OrderOutputDto> {
    const order = await this.orderRepository.findOne( {
      where: {
        uuid: orderUuid,
        validatedAt: null,
      },
      include: [Client, Service]});
    if (!order) throw new HttpException('Cannot find this order', HttpStatus.BAD_REQUEST);
    
    order.validatedAt = new Date();
    await order.save();
    
    return new OrderOutputDto(order);
  }
  
  async delete(orderUuid: string): Promise<OrderOutputDto> {
    const order = await this.orderRepository.findByPk(orderUuid, { include: [Client, Service]});
    if (!order) throw new HttpException('Cannot find this order', HttpStatus.BAD_REQUEST);
    
    await order.destroy();
    
    return new OrderOutputDto(order);
  }
  
  async update(orderUuid: string, orderUpdateInput: OrderUpdateInputDto): Promise<OrderOutputDto> {
    console.log()
    const order = await this.orderRepository.findByPk(orderUuid);
    if (!order) throw new HttpException('Cannot find this order', HttpStatus.BAD_REQUEST);
  
    const services = await this.serviceRepository.findAll({
      where: {
        uuid: { [Op.in]: orderUpdateInput.servicesUuid }
      }
    });
    if (services.length <= 0) throw new HttpException('Cannot retrieve services to associate', HttpStatus.BAD_REQUEST);
  
    const client = await this.clientRepository.findByPk(orderUpdateInput.clientUuid);
    if (!client) throw new HttpException('Cannot retrieve client', HttpStatus.BAD_REQUEST);
  
    const totalInCent = services.reduce((partialSum, a) => partialSum + a.priceInCent, 0)
  
    await order.$add('services', services);
    order.services = services;
    order.totalInCent = totalInCent;
    order.client = client;
    order.durationInMinute = orderUpdateInput.durationInMinute;
    order.performedAt = orderUpdateInput.performedAt;
  
    await order.save();
    
    return new OrderOutputDto(order)
  }
}
