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
import { ExpenditureService } from 'src/modules/expenditure/expenditure.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { ExpenditureCreateInputDto } from 'src/core/dtos/expenditure/expenditureCreateInputDto';
import { ExpenditureOutputDto } from 'src/core/dtos/expenditure/expenditureOutputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';

@ApiTags('expenditures')
@Controller('expenditures')
export class ExpenditureController {
  
  constructor(private readonly expenditureService: ExpenditureService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ExpenditureOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() expenditure: ExpenditureCreateInputDto): Promise<ExpenditureOutputDto> {
    return await this.expenditureService.create(expenditure);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ExpenditureOutputDto,
    isArray: true
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<ExpenditureOutputDto[]> {
    return await this.expenditureService.getAllForEntity(entityUuid);
  }
  
}
