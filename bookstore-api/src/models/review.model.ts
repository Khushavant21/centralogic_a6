import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import { User } from './user.model';
import { Book } from './book.model';

interface ReviewAttributes {
  id?: string;
  userId: string;
  bookId: string;
  content: string;
}

class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public content!: string;
}

Review.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'reviews',
    timestamps: true,
  }
);

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

export { Review, ReviewAttributes };
