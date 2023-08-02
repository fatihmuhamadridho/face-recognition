import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Role, User, UserDetail, Attendance, Setting, Coordinate } from '@apis/models';

const handler = nextConnect();
const date = new Date();

handler.get(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    await Role.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await User.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await UserDetail.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', {
      raw: true
    });
    await Attendance.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', {
      raw: true
    });
    await Setting.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await Coordinate.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

    await Role.sync({ force: true });
    await User.sync({ force: true });
    await UserDetail.sync({ force: true });
    await Attendance.sync({ force: true });
    await Setting.sync({ force: true });
    await Coordinate.sync({ force: true });

    await Role.bulkCreate([
      { role_id: 1, name: 'Administrator' },
      { role_id: 2, name: 'Pegawai' }
    ]);

    await User.create(
      {
        username: 'superadmin',
        password: 'superadmin',
        login_token: btoa(
          JSON.stringify({
            username: 'superadmin',
            password: 'superadmin'
          })
        ),
        login_token_expired: date.setHours(date.getHours() + 1),
        RoleId: 1,
        UserDetail: {
          first_name: 'superadmin',
          last_name: 'superadmin',
          birth_date: String(new Date()),
          gender: 'pria',
          address: 'Jl. H. Djiran'
        }
      },
      { include: [Role, UserDetail, Attendance] }
    );

    await User.create(
      {
        username: 'pegawai',
        password: 'pegawai',
        login_token: btoa(
          JSON.stringify({
            username: 'pegawai',
            password: 'pegawai'
          })
        ),
        login_token_expired: date.setHours(date.getHours() + 1),
        RoleId: 2,
        UserDetail: {
          first_name: 'pegawai',
          last_name: 'pegawai',
          birth_date: String(new Date()),
          gender: 'pria',
          address: 'Jl. H. Djiran'
        }
      },
      { include: [Role, UserDetail, Attendance] }
    );

    await Setting.create({
      name: 'balitbang'
    });

    await Coordinate.bulkCreate([
      {
        name: 'balitbang1',
        latitude: '-6.2233395446301785',
        longitude: '106.83251175380624',
        SettingId: 1
      },
      {
        name: 'balitbang2',
        latitude: '-6.223672277169106',
        longitude: '106.83158581193825',
        SettingId: 1
      }
    ]);

    await Attendance.create(
      {
        UserId: 2,
        status: 'Izin',
        distance: [
          {
            place_name: 'balitbang1',
            latitude: '-6.2233395446301785',
            longitude: '106.83251175380624',
            distance: '123'
          },
          {
            place_name: 'balitbang2',
            latitude: '-6.223672277169106',
            longitude: '106.83158581193825',
            distance: '321'
          }
        ],
        images: ['1.jpg'],
        description: 'Contoh Tepat Waktu'
      },
      { include: User }
    );

    const getAllRoles = await Role.findAll({});
    const getAllUsers = await User.findAll({ include: [Role, UserDetail] });
    const getAllAttendance = await Attendance.findAll({ include: User });
    const getAllSetting = await Setting.findAll({});
    res.status(200).json({
      status: true,
      data: {
        getAllRoles,
        getAllUsers,
        getAllAttendance,
        getAllSetting
      }
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
