import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('skripsi_face_recognition', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  benchmark: true
});

export { sequelize };
