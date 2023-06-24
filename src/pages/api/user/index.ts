import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Attendance, Role, User, UserDetail } from '@apis/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();
const date = new Date();

handler.get(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    const getAllUsers = await User.findAll({ include: UserDetail });
    res.status(200).json({
      status: true,
      data: getAllUsers
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, first_name, last_name, birth_date, gender, address, RoleId } =
    req.body;

  try {
    await sequelize.authenticate();
    const postUser = await User.create(
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
      { include: [Role, UserDetail, Attendance] }
    );
    res.status(200).json({
      status: true,
      data: postUser
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
