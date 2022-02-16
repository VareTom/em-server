import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Services
import { CarService } from './car.service';

// Controllers
import { CarController } from './car.controller';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CarController],
  providers: [
    CarService,
    ...EntitiesProviders
  ]
})
export class CarModule {}
