import { Module } from '@nestjs/common';

// Services
import { StatisticsService } from './statistics.service';

// Controllers
import { StatisticsController } from './statistics.controller';

// Modules
import { DatabaseModule } from 'src/core/database/database.module';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    ...EntitiesProviders
  ]
})
export class StatisticsModule {}
