import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { ClientController } from './client.controller';

// Services
import { ClientService } from './client.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    ...EntitiesProviders
  ]
})
export class ClientModule {}
