import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Op } from 'sequelize';
import { User } from '@apis/models';

const handler = nextConnect();

handler.post(async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    await sequelize.authenticate();

    const login_token = btoa(JSON.stringify({ email, password }));

    const updateUser: any = await User.update(
      {
        login_token
      },
      {
        where: {
          [Op.and]: [{ email }, { password }]
        },
        individualHooks: true
      }
    );

    const result = updateUser[1];
    res.status(200).json({
      status: true,
      data: result[0]
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
