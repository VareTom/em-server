import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { Address } from 'src/core/entities/address.entity';
import { Car } from 'src/core/entities/car.entity';
import { Client } from 'src/core/entities/client.entity';

// Constants
import { ADDRESS_REPOSITORY, CLIENT_REPOSITORY } from 'src/core/constants';

// DTOs
import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private addressRepository: typeof Address,
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: typeof Client
  ) {}

  async create(clientUuid: string, addressInput: AddressCreateInputDto): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findByPk(clientUuid, { include: [ Address, Car ] });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    await client.$create('address', addressInput);
    await client.reload();

    return new ClientOutputDto(client);
  }

  async update(addressUuid: string, addressInput: AddressCreateInputDto): Promise<ClientOutputDto> {
    const address = await this.addressRepository.findByPk(addressUuid);
    if (!address) throw new HttpException('Cannot find this address', HttpStatus.BAD_REQUEST);

    const isAddressUpdated = await this.addressRepository.update(addressInput, { where: {uuid: address.uuid}});
    if (isAddressUpdated[0] < 1) throw new HttpException('Cannot update this address', HttpStatus.BAD_REQUEST);

    const client = await this.clientRepository.findOne({
      include: [ Address, Car ],
      where: { addressUuid: addressUuid }
    });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    return new ClientOutputDto(client);
  }

  async delete(addressUuid: string): Promise<ClientOutputDto> {
    const client = await this.clientRepository.findOne({
      include: [ Address, Car ],
      where: { addressUuid: addressUuid }
    });
    if (!client) throw new HttpException('Cannot find this client', HttpStatus.BAD_REQUEST);

    await client.address.destroy();
    await client.reload();

    return new ClientOutputDto(client);
  }
}
