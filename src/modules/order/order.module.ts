import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { OrderController } from './order.controller';

// Services
import { OrderService } from './order.service';

// Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...EntitiesProviders
  ]
})
export class OrderModule {}
