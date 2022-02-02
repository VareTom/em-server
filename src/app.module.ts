import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EntityModule } from './modules/entity/entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EntityModule,
  ]
})
export class AppModule {}
