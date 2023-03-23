import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Op } from 'sequelize';
import { User } from '@apis/models';

const handler = nextConnect();

handler.post(async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    await sequelize.authenticate();

    const login_token = btoa(
      JSON.stringify({ email: 'superadmin', password: 'superadmin' })
    );
    const updateUser = await User.update(
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
    res.status(200).json({
      status: true,
      data: { updateUser }
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
