import { ClassSerializerInterceptor, Controller, Delete, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { CarService } from 'src/modules/car/car.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

// DTOs
import { CarOutputDto } from 'src/core/dtos/car/carOutputDto';

@ApiTags('cars')
@Controller('cars')
@UseInterceptors(ClassSerializerInterceptor)
export class CarController {
  
  constructor(private readonly carService: CarService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
