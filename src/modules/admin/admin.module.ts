import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { AdminController } from './admin.controller';

// Services
import { AdminService } from './admin.service';
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [
      AdminService,
    ...EntitiesProviders
  ]
})
export class AdminModule {}
