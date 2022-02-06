import {
  ADDRESS_REPOSITORY, CAR_REPOSITORY,
  CLIENT_REPOSITORY,
  ENTITY_REPOSITORY,
  EXPENDITURE_REPOSITORY, ORDER_REPOSITORY, ORDER_SERVICE_REPOSITORY,
  SERVICE_REPOSITORY,
  USER_ENTITY_REPOSITORY,
  USER_REPOSITORY
} from 'src/core/constants';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Entity } from 'src/core/entities/entity.entity';
import { UserEntity } from 'src/core/entities/user-entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { Client } from 'src/core/entities/client.entity';
import { Address } from 'src/core/entities/address.entity';
import { Order } from 'src/core/entities/order.entity';
import { Car } from 'src/core/entities/car.entity';
import { OrderService } from 'src/core/entities/order-service.entity';

export const EntitiesProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User
  },
  {
    provide: ENTITY_REPOSITORY,
    useValue: Entity
  },
  {
    provide: USER_ENTITY_REPOSITORY,
    useValue: UserEntity
  },
  {
    provide: SERVICE_REPOSITORY,
    useValue: Service
  },
  {
    provide: EXPENDITURE_REPOSITORY,
    useValue: Expenditure
  },
  {
    provide: CLIENT_REPOSITORY,
    useValue: Client
  },
  {
    provide: ADDRESS_REPOSITORY,
    useValue: Address
  },
  {
    provide: ORDER_REPOSITORY,
    useValue: Order
  },
  {
    provide: CAR_REPOSITORY,
    useValue: Car
  },
  {
    provide: ORDER_SERVICE_REPOSITORY,
    useValue: OrderService
  }
]