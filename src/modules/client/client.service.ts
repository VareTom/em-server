import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { CLIENT_REPOSITORY, ADDRESS_REPOSITORY } from 'src/core/constants';

// Entities
import { Client } from 'src/core/entities/client.entity';
import { Address } from 'src/core/entities/address.entity';

@Injectable()
export class ClientService {
  constructor(@Inject(CLIENT_REPOSITORY) private clientRepository: typeof Client,
              @Inject(ADDRESS_REPOSITORY) private addressRepository: typeof Address) {
  }

  async create(client: any): Promise<any> {
    const addressData = client.address;
    const clientData = client;
    const createdAddress = await this.addressRepository.create(addressData);
    if (!createdAddress) throw new HttpException('Cannot create client address!', HttpStatus.BAD_REQUEST);

    const createdClient = await this.clientRepository.create({
      ...clientData,
      addressUuid: createdAddress.uuid
    }).then(client => client.toJSON());
    if (!createdClient) throw new HttpException('Cannot create client!', HttpStatus.BAD_REQUEST);

    return {
      ...createdClient.toJSON(),
      address: createdAddress.toJSON()
    }
  }
}
