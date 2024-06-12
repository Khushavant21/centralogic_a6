import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Book extends Model {
  public id!: number;
  public bookCode!: string;
  public title!: string;
  public description!: string;
  public publishedYear!: number;
  public price!: number;
  public externalId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'books',
  }
);

export default Book;
