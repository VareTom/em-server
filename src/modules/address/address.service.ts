import { Inject, Injectable } from '@nestjs/common';

// Entities
import { Address } from 'src/core/entities/address.entity';

// Constants
import { ADDRESS_REPOSITORY } from 'src/core/constants';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private addressRepository: typeof Address
  ) {}
}
