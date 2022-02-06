import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default, ForeignKey,
  IsDate,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsNumber, IsString } from 'class-validator';
import { Entity } from 'src/core/entities/entity.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Expenditure extends Model<Expenditure> {
  
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
  
  @IsNumber()
  @AllowNull(false)
  @Column
  priceInCent: number;
  
  @IsDate
  @AllowNull(true)
  @Column
  boughtAt: Date;
  
  @ForeignKey(() => Entity)
  @Column
  entityUuid: string;
  
  @BelongsTo(() => Entity)
  entity: Entity
}