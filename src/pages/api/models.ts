import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@apis/connection';

class User extends Model {}
class UserDetail extends Model {}
class Role extends Model {}
class Attendance extends Model {}
class Setting extends Model {}
class Coordinate extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
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
    birth_date: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING
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
    },
    status: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    place_name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    images: DataTypes.JSON,
    description: DataTypes.STRING,
  },
  { sequelize }
);

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
  { sequelize }
)

Coordinate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
  },
  { sequelize }
)

Role.hasMany(User);
User.belongsTo(Role);

User.hasOne(UserDetail);
UserDetail.belongsTo(User);

User.hasMany(Attendance);
Attendance.belongsTo(User);

Setting.hasMany(Coordinate);
Coordinate.belongsTo(Setting);

export { Role, User, UserDetail, Attendance, Setting, Coordinate };
