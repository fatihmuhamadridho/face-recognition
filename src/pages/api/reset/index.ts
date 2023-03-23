import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { User } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    await User.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await User.sync({ force: true });

    await User.create({ username: 'superadmin', password: 'superadmin' });

    const getAllUsers = await User.findAll({});
    res.status(200).json({
      status: true,
      data: {
        getAllUsers
      }
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
