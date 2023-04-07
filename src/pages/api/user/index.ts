import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { User, UserDetail } from '@apis/models';

const handler = nextConnect();

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

handler.post(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    const getAllUsers = await User.findAll({});
    res.status(200).json({
      status: true,
      data: getAllUsers
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
