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

// DTOs
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { ClientFullCreateInputDto } from 'src/core/dtos/client/clientFullCreateInputDto';

// Services
import { ClientService } from 'src/modules/client/client.service';

@ApiTags('clients')
@Controller('clients')
export class ClientController {

  constructor(private readonly clientService: ClientService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() client: ClientFullCreateInputDto): Promise<ClientOutputDto> {
    return await this.clientService.create(client);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ClientOutputDto,
    isArray: true
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<ClientOutputDto[]> {
    return await this.clientService.getAllForEntity(entityUuid);
  }

}
