import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [UserModule, AuthModule, EntityModule]
})
export class AppModule {}
