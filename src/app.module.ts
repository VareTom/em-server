import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EntityModule,
    ClientModule,
    ServiceModule,
    OrderModule,
    ExpenditureModule,
    AddressModule,
    StatisticsModule
  ]
})
export class AppModule {}
