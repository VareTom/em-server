import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table, Unique
} from 'sequelize-typescript';
import { IsBoolean } from 'class-validator';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Entity } from 'src/core/entities/entity.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class UserEntity extends Model<UserEntity> {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Unique
  @Column
  uuid: string;

  @ForeignKey(() => User)
  @Column
  userUuid: string;

  @BelongsTo(() => User)
  user: User
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;

  @BelongsTo(() => Entity)
  entity: Entity
  
  @IsBoolean()
  @Default(false)
  @Column
  isAdmin: boolean;
}
