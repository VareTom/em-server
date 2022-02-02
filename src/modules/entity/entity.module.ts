import { Module } from '@nestjs/common';
import { EntityService } from 'src/modules/entity/entity.service';
import { EntityController } from 'src/modules/entity/entity.controller';

@Module({
  providers: [EntityService],
  controllers: [EntityController]
})
export class EntityModule {}
