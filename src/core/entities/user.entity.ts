import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey, Sequelize,
  Table, Unique,
  UpdatedAt
} from 'sequelize-typescript';


@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  id: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string
  
  @Column({
    type: DataType.STRING
  })
  password: string
}