import { Table, Model, Column, DataType, Default } from 'sequelize-typescript';

// Declaramos el enum para las categorías
export enum CategoryType {
  SMARTWATCH = 'smartwatch',
  AURICULAR = 'auricular',
}

@Table({
  tableName: 'products',
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare img: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare cost: number;

  @Column({
    type: DataType.FLOAT,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare stock: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(CategoryType)),
    allowNull: false,
    defaultValue: CategoryType.SMARTWATCH,
  })
  declare category: CategoryType;
}

export default Product;
