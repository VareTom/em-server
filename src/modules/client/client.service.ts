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
import { ClientCreateInputDto } from 'src/core/dtos/client/clientCreateInputDto';
import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';
import { CarCreateInputDto } from 'src/core/dtos/car/carCreateInputDto';

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
  
  //TODO:: verify no address link
  async createAddress(clientUuid: string, addressInput: AddressCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
  
    await client.$create('address', addressInput);
    await client.reload();
    
    return new ClientOutputDto(client);
  }
  
  async createCar(clientUuid: string, carInput: CarCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
  
    const createdCar = await this.carRepository.create(carInput);
    if (!createdCar) throw new HttpException('Cannot create car', HttpStatus.BAD_REQUEST);
    await client.$add('cars', createdCar);
    await client.reload();
    
    return new ClientOutputDto(client);
  }
  
  async update(clientUuid: string, clientInput: ClientCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
    
    client.firstName = clientInput.firstName;
    client.lastName = clientInput.lastName;
    await client.save();
    
    return new ClientOutputDto(client);
  }

  async updateCar(clientUuid: string, carUuid: string, carInput: CarCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    const car = await this.carRepository.findByPk(carUuid);
    if (!car) throw new HttpException('Cannot find this car', HttpStatus.BAD_REQUEST);

    const isCarUpdated = await this.carRepository.update(carInput, { where: {uuid: car.uuid}});
    if (isCarUpdated[0] < 1) throw new HttpException('Cannot update this car', HttpStatus.BAD_REQUEST);
    await client.reload();

    return new ClientOutputDto(client);
  }

  async updateAddress(clientUuid: string, addressInput: AddressCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    const address = await this.addressRepository.findByPk(client.addressUuid);
    if (!address) throw new HttpException('Cannot find this address', HttpStatus.BAD_REQUEST);

    const isAddressUpdated = await this.addressRepository.update(addressInput, { where: {uuid: address.uuid}});
    if (isAddressUpdated[0] < 1) throw new HttpException('Cannot update this address', HttpStatus.BAD_REQUEST);
    await client.reload();

    return new ClientOutputDto(client);
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
  
  async deleteAddress(clientUuid: string): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
    
    await client.address.destroy();
    await client.reload();
    
    return new ClientOutputDto(client);
  }
  
  async deleteCar(clientUuid: string,carUuid: string): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);
    
    const carToDelete = client.cars.find(car => car.uuid === carUuid);
    await carToDelete.destroy();
    await client.reload();
    
    return new ClientOutputDto(client);
  }
  
  async getClientDetails(userUuid: string): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findOne({
      where: {uuid: userUuid},
      include: [ Address, Car ]
    });
    if (!client) throw new HttpException('Cannot retrieve this client', HttpStatus.BAD_REQUEST);
    
    return new ClientOutputDto(client);
  }
}
