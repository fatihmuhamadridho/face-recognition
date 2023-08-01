import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { User, Attendance } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  const { access_token } = req.query;
  try {
    await sequelize.authenticate();
    const findUser = await User.findOne({
      where: { login_token: access_token }
    });
    const getAttendance = await Attendance.findAll({
      where: { UserId: findUser?.toJSON().id },
      order: [['createdAt', 'DESC']],
    });

    
    res.status(200).json({
      status: true,
      data: getAttendance.map((attData) => {
        return {
          ...attData.toJSON(),
          distance: JSON.parse(attData.toJSON().distance)
        }
      })
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
