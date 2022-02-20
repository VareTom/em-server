import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { EntityController } from 'src/modules/entity/entity.controller';

// Services
import { EntityService } from 'src/modules/entity/entity.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EntityController],
  providers: [
    EntityService,
    ...EntitiesProviders
  ]
})
export class EntityModule {}
