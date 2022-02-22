import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { CarService } from 'src/modules/car/car.service';

@ApiTags('cars')
@Controller('cars')
@UseInterceptors(ClassSerializerInterceptor)
export class CarController {
  
  constructor(private readonly carService: CarService) {
  }
  
}
