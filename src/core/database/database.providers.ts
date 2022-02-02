import { Sequelize } from 'sequelize-typescript';

// Config
import { databaseConfig } from 'src/core/database/database.config';

// Constants
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';

// Entities
import { User } from 'src/core/entities/user.entity';

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
    sequelize.addModels([User]);
    await sequelize.sync();
    return sequelize;
  },
}];