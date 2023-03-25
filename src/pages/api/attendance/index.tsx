import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { User, Attendance } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    const getAllAttendance = await Attendance.findAll({});
    res.status(200).json({
      status: true,
      data: getAllAttendance
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.post(async (req: any, res: any) => {
  const { authorization } = req.headers;
  try {
    await sequelize.authenticate();
    const findUser = await User.findOne({
      where: { login_token: authorization.split('Bearer ')[1] }
    });
    const createAttendace = await Attendance.create(
      { UserId: findUser?.toJSON().id },
      { include: User }
    );
    res.status(200).json({
      status: true,
      data: createAttendace
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
