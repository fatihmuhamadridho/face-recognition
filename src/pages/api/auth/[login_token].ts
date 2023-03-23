import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Op } from 'sequelize';
import { User } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  const { login_token } = req.query;
  try {
    await sequelize.authenticate();
    const findUser = await User.findOne({
      where: {
        login_token
      }
    });
    res.status(200).json({
      status: true,
      //   params: req.params,
      //   query: req.query,
      data: findUser
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
