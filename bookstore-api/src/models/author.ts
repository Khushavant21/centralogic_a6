import { DataTypes, Model } from 'sequelize';


class Author extends Model {
  public id!: number;
  public name!: string;
  public bio!: string;
  public birthdate!: Date;
  public isSystemUser!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isSystemUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'authors',
  }
);

export default Author;
