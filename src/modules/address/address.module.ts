import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { AddressController } from './address.controller';

// Services
import { AddressService } from './address.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    ...EntitiesProviders
  ]
})
export class AddressModule {}
