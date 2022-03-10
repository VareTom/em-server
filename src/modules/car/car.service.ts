import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { CAR_REPOSITORY, CLIENT_REPOSITORY } from 'src/core/constants';

// Entities
import { Car } from 'src/core/entities/car.entity';
import { CarOutputDto } from 'src/core/dtos/car/carOutputDto';
import { Client } from 'src/core/entities/client.entity';
import { CarCreateInputDto } from 'src/core/dtos/car/carCreateInputDto';
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { Address } from 'src/core/entities/address.entity';

@Injectable()
export class CarService {
  
  constructor(
      @Inject(CAR_REPOSITORY)
      private carRepository: typeof Car,
      @Inject(CLIENT_REPOSITORY)
      private clientRepository: typeof Client
  ) {
  }

  async create(clientUuid: string, carInput: CarCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    const createdCar = await this.carRepository.create(carInput);
    if (!createdCar) throw new HttpException('Cannot create car', HttpStatus.BAD_REQUEST);
    await client.$add('cars', createdCar);
    await client.reload();

    return new ClientOutputDto(client);
  }

  async update(clientUuid: string, carUuid: string, carInput: CarCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    const car = await this.carRepository.findByPk(carUuid);
    if (!car) throw new HttpException('Cannot find this car', HttpStatus.BAD_REQUEST);

    const isCarUpdated = await this.carRepository.update(carInput, { where: {uuid: car.uuid}});
    if (isCarUpdated[0] < 1) throw new HttpException('Cannot update this car', HttpStatus.BAD_REQUEST);
    await client.reload();

    return new ClientOutputDto(client);
  }
  
  async delete(carUuid: string): Promise<CarOutputDto> {
    const car = await this.carRepository.findByPk(carUuid);
    if (!car) throw new HttpException('Cannot find this car', HttpStatus.BAD_REQUEST);

    await car.destroy();
    
    return new CarOutputDto(car);
  }
  
}
