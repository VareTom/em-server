import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { StatisticsService } from 'src/modules/statistics/statistics.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { StatisticsOutputDto } from 'src/core/dtos/dashboard/statisticsOutputDto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  
  constructor(private readonly statisticsService: StatisticsService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: StatisticsOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':entityUuid')
  async getForEntity(@Param('entityUuid') entityUuid: string): Promise<StatisticsOutputDto> {
    return await this.statisticsService.getForEntity(entityUuid);
  }
}
