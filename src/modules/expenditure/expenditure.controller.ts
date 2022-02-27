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
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { ExpenditureService } from 'src/modules/expenditure/expenditure.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { ExpenditureCreateInputDto } from 'src/core/dtos/expenditure/expenditureCreateInputDto';
import { ExpenditureOutputDto } from 'src/core/dtos/expenditure/expenditureOutputDto';
import { ExpenditureUpdateInputDto } from 'src/core/dtos/expenditure/expenditureUpdateInputDto';

@ApiTags('expenditures')
@Controller('expenditures')
@UseInterceptors(ClassSerializerInterceptor)
export class ExpenditureController {
  
  constructor(private readonly expenditureService: ExpenditureService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ExpenditureOutputDto
  })
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
  @Get(':entityUuid')
  async findAllForEntity(@Param('entityUuid') entityUuid: string): Promise<ExpenditureOutputDto[]> {
    return await this.expenditureService.getAllForEntity(entityUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ExpenditureOutputDto
  })
  @Delete(':expenditurerUuid')
  async delete(@Param('expenditurerUuid') expenditurerUuid: string): Promise<ExpenditureOutputDto> {
    return await this.expenditureService.delete(expenditurerUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: ExpenditureOutputDto
  })
  @Put(':expenditurerUuid')
  async update(@Param('expenditurerUuid') expenditurerUuid: string,
               @Body() expenditureUpdateInput: ExpenditureUpdateInputDto): Promise<ExpenditureOutputDto> {
    return await this.expenditureService.update(expenditurerUuid, expenditureUpdateInput);
  }
  
}
