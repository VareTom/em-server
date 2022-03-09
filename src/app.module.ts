import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Custom Modules
import { DatabaseModule } from 'src/core/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EntityModule } from './modules/entity/entity.module';
import { ClientModule } from 'src/modules/client/client.module';
import { ServiceModule } from 'src/modules/service/service.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ExpenditureModule } from 'src/modules/expenditure/expenditure.module';
import { AddressModule } from 'src/modules/address/address.module';
import { StatisticsModule } from 'src/modules/statistics/statistics.module';
import { CarModule } from 'src/modules/car/car.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { AdminModule } from './modules/admin/admin.module';

// Middlewares
import LogsMiddleware from 'src/middleware/logs.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Custom Modules
    DatabaseModule,
    UserModule,
    AuthModule,
    CarModule,
    EntityModule,
    ClientModule,
    ServiceModule,
    OrderModule,
    ExpenditureModule,
    AddressModule,
    StatisticsModule,
    MailModule,
    AdminModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LogsMiddleware)
        .forRoutes('*');
  }
}
