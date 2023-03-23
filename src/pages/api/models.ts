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
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  { sequelize }
);

export { User };
