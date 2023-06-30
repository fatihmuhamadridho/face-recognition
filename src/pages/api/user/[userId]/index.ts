import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Attendance, Role, User, UserDetail } from '@apis/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();
const date = new Date();

handler.get(async (req: any, res: any) => {
  const { userId } = req.query;

  try {
    await sequelize.authenticate();
    const getDetailUser = await User.findOne({
      where: { id: userId },
      include: UserDetail
    });

    if (!getDetailUser) throw Error('User tidak ditemukan')

    res.status(200).json({
      status: true,
      data: getDetailUser
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const {
    username,
    password,
    first_name,
    last_name,
    birth_date,
    gender,
    address,
    RoleId
  } = req.body;

  try {
    await sequelize.authenticate();
    const updateUser: any = await User.update(
      {
        username,
        password,
        login_token: btoa(
          JSON.stringify({
            username,
            password
          })
        ),
        login_token_expired: date.setHours(date.getHours() + 1),
        RoleId: RoleId,
        UserDetail: {
          first_name,
          last_name,
          birth_date,
          gender,
          address
        }
      },
      { where: { id: userId }, individualHooks: true }
    );
    await UserDetail.update(
      {
        first_name,
        last_name,
        birth_date,
        gender,
        address
      },
      { where: { UserId: userId } }
    );

    if (updateUser[0] === 0) throw Error('User Tidak Ditemukan');

    const result = updateUser[1];

    res.status(200).json({
      status: true,
      data: result[0]
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.delete(async (req: any, res: any) => {
  const { userId } = req.query;

  try {
    await sequelize.authenticate();
    await Attendance.destroy({ where: { UserId: Number(userId) } });
    await UserDetail.destroy({ where: { UserId: Number(userId) } });
    const deleteUser = await User.destroy({ where: { id: userId } });

    if (deleteUser === 0) throw Error('User tidak ditemukan');

    res.status(200).json({
      status: true,
      data: deleteUser
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error });
  }
});

export default handler;
