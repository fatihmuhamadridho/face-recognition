import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { User, Attendance } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  try {
    await sequelize.authenticate();
    const getAllAttendance = await Attendance.findAll({
      include: User,
      order: [['createdAt', 'DESC']]
    });
    const result = getAllAttendance.map((att) => {
      return {
        ...att.toJSON(),
        User: undefined,
        distance: JSON.parse(att.toJSON().distance),
        ...att.toJSON().User
      };
    });
    res.status(200).json({
      status: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.post(async (req: any, res: any) => {
  const { status, distance, place_name, latitude, longitude, images, description } = req.body;
  const { authorization } = req.headers;

  try {
    await sequelize.authenticate();
    const findUser = await User.findOne({
      where: { login_token: authorization.split('Bearer ')[1] }
    });
    const createAttendace = await Attendance.create(
      {
        UserId: findUser?.toJSON().id,
        status,
        distance,
        place_name,
        latitude,
        longitude,
        images,
        description
      },
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
