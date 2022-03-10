import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post, Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { CarService } from 'src/modules/car/car.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

// DTOs
import { CarOutputDto } from 'src/core/dtos/car/carOutputDto';
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { CarCreateInputDto } from 'src/core/dtos/car/carCreateInputDto';

@ApiTags('cars')
@Controller('cars')
@UseInterceptors(ClassSerializerInterceptor)
export class CarController {
  
  constructor(private readonly carService: CarService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create a car for a client and return client object'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Post(':clientUuid')
  async create(
      @Param('clientUuid') clientUuid: string,
      @Body() car: CarCreateInputDto): Promise<ClientOutputDto> {
    return await this.carService.create(clientUuid, car);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "Update a client's car and return client object"})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Put(':carUuid/client/:clientUuid')
  async update(
      @Param('clientUuid') clientUuid: string,
      @Param('carUuid') carUuid: string,
      @Body() carInput: CarCreateInputDto): Promise<ClientOutputDto> {
    return await this.carService.update(clientUuid, carUuid, carInput);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete a car and return the object of deleted car'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: CarOutputDto
  })
  @Delete(':carUuid')
  async delete(@Param('carUuid') carUuid: string): Promise<CarOutputDto> {
    return await this.carService.delete(carUuid);
  }
  
}
