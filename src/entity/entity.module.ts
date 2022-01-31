import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [EntityService, PrismaService],
  controllers: [EntityController]
})
export class EntityModule {}
