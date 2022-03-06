import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { CLIENT_REPOSITORY, ADDRESS_REPOSITORY, CAR_REPOSITORY } from 'src/core/constants';

// Entities
import { Client } from 'src/core/entities/client.entity';
import { Address } from 'src/core/entities/address.entity';
import { Car } from 'src/core/entities/car.entity';

// DTOs
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { ClientFullCreateInputDto } from 'src/core/dtos/client/clientFullCreateInputDto';

@Injectable()
export class ClientService {
  constructor(@Inject(CLIENT_REPOSITORY) private clientRepository: typeof Client,
              @Inject(CAR_REPOSITORY) private carRepository: typeof Car,
              @Inject(ADDRESS_REPOSITORY) private addressRepository: typeof Address) {
  }

  async create(clientInput: ClientFullCreateInputDto): Promise<ClientOutputDto> {
    const createdClient = await this.clientRepository.create(clientInput.client);
    if (!createdClient) throw new HttpException('Cannot create client', HttpStatus.BAD_REQUEST);
    
    if (clientInput.address) {
      await createdClient.$create('address', clientInput.address);
    }
    
    if (clientInput.car) {
      const createdCar = await this.carRepository.create(clientInput.car);
      if (!createdCar) throw new HttpException('Cannot create car', HttpStatus.BAD_REQUEST);
      await createdClient.$add('cars', createdCar);
    }
    
    const returnedClient = await this.clientRepository.findByPk(createdClient.uuid, {
      include: [ Address, Car ]
    });
    
    return new ClientOutputDto(returnedClient);
  }
  
  async getAllForEntity(entityUuid: string): Promise<ClientOutputDto[]> {
    const clients = await this.clientRepository.findAll({
      where: {entityUuid: entityUuid},
      include: [ Address, Car ]
    });
    if (!clients) throw new HttpException('Cannot retrieve all clients for this entity', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return clients.map(client => new ClientOutputDto(client));
  }
  
  async delete(clientUuid: string): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
    
    await client.destroy();
    
    return new ClientOutputDto(client);
  }
}
