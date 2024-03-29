import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post, Put, Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { OrderService } from 'src/modules/order/order.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

// DTOs
import { OrderCreateInputDto } from 'src/core/dtos/order/orderCreateInputDto';
import { OrderOutputDto } from 'src/core/dtos/order/orderOutputDto';
import { OrderUpdateInputDto } from 'src/core/dtos/order/orderUpdateInputDto';
import { FiltersPeriodEnum } from 'src/core/enums/filters-period.enum';

@ApiTags('orders')
@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  
  constructor(private readonly orderService: OrderService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: OrderOutputDto
  })
  @Post()
  async create(@Body() order: OrderCreateInputDto): Promise<OrderOutputDto> {
    return await this.orderService.create(order);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: OrderOutputDto,
    isArray: true
  })
  @ApiQuery({name: 'period', enum: FiltersPeriodEnum})
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string,
                         @Query('period') period: FiltersPeriodEnum): Promise<OrderOutputDto[]> {
    return await this.orderService.findAllForEntity(entityUuid, period);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: OrderOutputDto
  })
  @Get(':orderUuid/validate')
  async validate(@Param('orderUuid') orderUuid: string): Promise<OrderOutputDto> {
    return await this.orderService.validate(orderUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: OrderOutputDto
  })
  @Delete(':orderUuid')
  async delete(@Param('orderUuid') orderUuid: string): Promise<OrderOutputDto> {
    return await this.orderService.delete(orderUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: OrderOutputDto
  })
  @Put(':orderUuid')
  async update(@Param('orderUuid') orderUuid: string,
               @Body() orderUpdateInput: OrderUpdateInputDto): Promise<OrderOutputDto> {
    return await this.orderService.update(orderUuid, orderUpdateInput);
  }
}
