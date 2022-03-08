import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// DTOs
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { ClientFullCreateInputDto } from 'src/core/dtos/client/clientFullCreateInputDto';

// Services
import { ClientService } from 'src/modules/client/client.service';
import { ClientCreateInputDto } from 'src/core/dtos/client/clientCreateInputDto';

@ApiTags('clients')
@Controller('clients')
@UseInterceptors(ClassSerializerInterceptor)
export class ClientController {

  constructor(private readonly clientService: ClientService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Post()
  async create(@Body() client: ClientFullCreateInputDto): Promise<ClientOutputDto> {
    return await this.clientService.create(client);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Put(':clientUuid')
  async update(
      @Param('clientUuid') clientUuid: string,
      @Body() clientInput: ClientCreateInputDto): Promise<ClientOutputDto> {
    return await this.clientService.update(clientUuid,clientInput);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto
  })
  @Get(':userUuid/details')
  async clientDetails(@Param('userUuid') userUuid: string): Promise<ClientOutputDto> {
    return await this.clientService.getClientDetails(userUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto,
    isArray: true
  })
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<ClientOutputDto[]> {
    return await this.clientService.getAllForEntity(entityUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto
  })
  @Delete(':clientUuid')
  async delete(@Param('clientUuid') clientUuid: string): Promise<ClientOutputDto> {
    return await this.clientService.delete(clientUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto
  })
  @Delete(':clientUuid/address')
  async deleteAddress(@Param('clientUuid') clientUuid: string): Promise<ClientOutputDto> {
    return await this.clientService.deleteAddress(clientUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto
  })
  @Delete(':clientUuid/car/:carUuid')
  async deleteCar(@Param('clientUuid') clientUuid: string,
                  @Param('carUuid') carUuid: string): Promise<ClientOutputDto> {
    return await this.clientService.deleteCar(clientUuid,carUuid);
  }

}
