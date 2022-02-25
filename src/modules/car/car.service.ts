import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { CAR_REPOSITORY } from 'src/core/constants';

// Entities
import { Car } from 'src/core/entities/car.entity';
import { CarOutputDto } from 'src/core/dtos/car/carOutputDto';

@Injectable()
export class CarService {
  
  constructor(@Inject(CAR_REPOSITORY) private carRepository: typeof Car) {
  }
  
  async delete(carUuid: string): Promise<CarOutputDto> {
    const car = await this.carRepository.findByPk(carUuid);
    if (!car) throw new HttpException('Cannot find this car', HttpStatus.BAD_REQUEST);
    
    await car.destroy();
    
    return new CarOutputDto(car);
  }
  
}
