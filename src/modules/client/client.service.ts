import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { CLIENT_REPOSITORY, ADDRESS_REPOSITORY } from 'src/core/constants';

// Entities
import { Client } from 'src/core/entities/client.entity';
import { Address } from 'src/core/entities/address.entity';

// DTOs
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { ClientAddressCreateInputDto } from 'src/core/dtos/client/clientAddressCreateInputDto';

@Injectable()
export class ClientService {
  constructor(@Inject(CLIENT_REPOSITORY) private clientRepository: typeof Client,
              @Inject(ADDRESS_REPOSITORY) private addressRepository: typeof Address) {
  }

  async create(clientAddress: ClientAddressCreateInputDto): Promise<ClientOutputDto> {
    const createdClient = await this.clientRepository.create(clientAddress.client);
    if (!createdClient) throw new HttpException('Cannot create client', HttpStatus.BAD_REQUEST);
    
    if (clientAddress.address) {
      const createdClientAddress = await this.addressRepository.create(clientAddress.address).then(address => address.toJSON());
      if (!createdClientAddress) throw new HttpException('Cannot create client address', HttpStatus.BAD_REQUEST);
      
      await createdClient.$set('address', createdClientAddress.uuid);
    }
    
    const returnedClient = await this.clientRepository.findByPk(createdClient.uuid, {
      include: [ Address ]
    });
    
    return new ClientOutputDto(returnedClient);
  }
  
  async getAllForEntity(entityUuid: string): Promise<ClientOutputDto[]> {
    const clients = await this.clientRepository.findAll({
      where: {entityUuid: entityUuid},
      include: [ Address ]
    });
    if (!clients) throw new HttpException('Cannot retrieve all clients for this entity', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return clients.map(client => new ClientOutputDto(client));
  }
}
