import { Column, Default, ForeignKey, Model, Table } from 'sequelize-typescript';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Entity } from 'src/core/entities/entity.entity';
import { IsBoolean } from 'class-validator';


@Table({
  timestamps: true,
  paranoid: true,
})
export class UserEntity extends Model<UserEntity> {
  @ForeignKey(() => User)
  @Column
  userUuid: string;
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @IsBoolean()
  @Default(false)
  @Column
  isAdmin: boolean;
}