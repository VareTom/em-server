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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { ServiceService } from 'src/modules/service/service.service';

// DTOs
import { ServiceCreateInputDto } from 'src/core/dtos/service/serviceCreateInputDto';
import { ServiceOutputDto } from 'src/core/dtos/service/serviceOutputDto';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  
  constructor(private readonly serviceService: ServiceService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ServiceOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() service: ServiceCreateInputDto): Promise<ServiceOutputDto> {
    return await this.serviceService.create(service);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ServiceOutputDto,
    isArray: true
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<ServiceOutputDto[]> {
    return await this.serviceService.getAllForEntity(entityUuid);
  }
  
}
