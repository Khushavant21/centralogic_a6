import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import { User } from './user.model';
import { Book } from './book.model';

interface RatingAttributes {
  id?: string;
  userId: string;
  bookId: string;
  rating: number;
}

class Rating extends Model<RatingAttributes> implements RatingAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public rating!: number;
}

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ratings',
    timestamps: true,
  }
);

Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });

export { Rating, RatingAttributes };
