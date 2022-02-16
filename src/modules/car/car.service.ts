import { Inject, Injectable } from '@nestjs/common';

// Constants
import { CAR_REPOSITORY } from 'src/core/constants';

// Entities
import { Car } from 'src/core/entities/car.entity';

@Injectable()
export class CarService {
  
  constructor(@Inject(CAR_REPOSITORY) private carRepository: typeof Car) {
  }
  
}
