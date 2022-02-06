import { Sequelize } from 'sequelize-typescript';

// Config
import { databaseConfig } from 'src/core/database/database.config';

// Constants
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Entity } from 'src/core/entities/entity.entity';
import { UserEntity } from 'src/core/entities/user-entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { Client } from 'src/core/entities/client.entity';
import { Address } from 'src/core/entities/address.entity';
import { Order } from 'src/core/entities/order.entity';
import { OrderService } from 'src/core/entities/order-service.entity';
import { Car } from 'src/core/entities/car.entity';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case DEVELOPMENT:
        config = databaseConfig.development;
        break;
      default:
        config = databaseConfig.development;
    }
    const sequelize = new Sequelize(config);
    sequelize.addModels([
      User,
      Entity,
      UserEntity,
      Service,
      Expenditure,
      Client,
      Address,
      Order,
      OrderService
    ]);
    await sequelize.sync(); //{alter: true}
    return sequelize;
  },
}];