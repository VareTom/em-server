import { Module } from '@nestjs/common';

// Controllers
import { UserController } from './user.controller';

// Services
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
