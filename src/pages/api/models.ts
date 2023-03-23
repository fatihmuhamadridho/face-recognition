import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@apis/connection';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    login_token: DataTypes.STRING,
    login_token_expired: DataTypes.DATE
  },
  { sequelize }
);

export { User };
