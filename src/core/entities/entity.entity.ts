import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default, ForeignKey, HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsString } from 'class-validator';

// Entities
import { User } from 'src/core/entities/user.entity';
import { UserEntity } from 'src/core/entities/user-entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { Order } from 'src/core/entities/order.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Entity extends Model<Entity> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;

  @IsString()
  @AllowNull(false)
  @Column
  name: string;
  
  @IsString()
  @AllowNull(true)
  @Column
  description?: string;
  
  @ForeignKey(() => User)
  @Column
  authorUuid: string;
  
  @BelongsToMany(() => User, () => UserEntity)
  members: User[];
  
  @HasMany(() => Service)
  services: Service[];
  
  @HasMany(() => Expenditure)
  expenditures: Expenditure[];
  
  @HasMany(() => Order)
  orders: Order[];
}