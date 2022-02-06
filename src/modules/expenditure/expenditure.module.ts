import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { ExpenditureController } from './expenditure.controller';

// Services
import { ExpenditureService } from './expenditure.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenditureController],
  providers: [
    ExpenditureService,
    ...EntitiesProviders
  ]
})
export class ExpenditureModule {}
