import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import { User } from './user.model';
import { Book } from './book.model';

interface PaymentAttributes {
  id?: string;
  userId: string;
  bookId: string;
  amount: number;
  status: string;
  createdAt: Date;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public amount!: number;
  public status!: string;
  public createdAt!: Date;
}

Payment.init(
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
  }
);

Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });

export { Payment, PaymentAttributes };
