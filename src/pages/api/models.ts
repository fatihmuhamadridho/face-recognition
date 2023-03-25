import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@apis/connection';

class User extends Model {}
class UserDetail extends Model {}
class Role extends Model {}
class Attendance extends Model {}

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

UserDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    gender: DataTypes.STRING,
    position: DataTypes.STRING
  },
  { sequelize }
);

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  },
  { sequelize, timestamps: false }
);

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  { sequelize }
);

Role.hasMany(User);
User.belongsTo(Role);

User.hasOne(UserDetail);
UserDetail.belongsTo(User);

User.hasMany(Attendance);
Attendance.belongsTo(User);

export { Role, User, UserDetail, Attendance };
