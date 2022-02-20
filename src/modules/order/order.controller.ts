import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { OrderService } from 'src/modules/order/order.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { OrderCreateInputDto } from 'src/core/dtos/order/orderCreateInputDto';
import { OrderOutputDto } from 'src/core/dtos/order/orderOutputDto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  
  constructor(private readonly orderService: OrderService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: OrderOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<OrderOutputDto[]> {
    return await this.orderService.findAllForEntity(entityUuid);
  }
  
}
