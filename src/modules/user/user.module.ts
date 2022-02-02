import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';

// Controllers
import { UserController } from 'src/modules/user/user.controller';

// Services
import { UserService } from 'src/modules/user/user.service';

// Providers
import { EntityProviders } from 'src/core/providers/entity.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...EntityProviders
  ]
})
export class UserModule {}
