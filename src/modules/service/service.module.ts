import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { ServiceController } from './service.controller';

// Services
import { ServiceService } from './service.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    ...EntitiesProviders
  ]
})
export class ServiceModule {}
