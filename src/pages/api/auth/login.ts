import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Op } from 'sequelize';
import { User } from '@apis/models';

const handler = nextConnect();

handler.post(async (req: any, res: any) => {
  const { username, password } = req.body;
  try {
    await sequelize.authenticate();
    const findUser = await User.findOne({ where: { username } });
    res.status(200).json({
      status: true,
      data: findUser
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
