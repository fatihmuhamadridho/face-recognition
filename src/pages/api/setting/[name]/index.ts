import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Coordinate, Setting } from '@apis/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  try {
    await sequelize.authenticate();
    const getAllSettings = await Setting.findOne({ where: { name }, include: Coordinate });
    res.status(200).json({
      status: true,
      data: getAllSettings
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  const { latitude, longitude } = req.body;
  try {
    await sequelize.authenticate();
    const updateSetting: any = await Setting.update(
      { latitude, longitude },
      { where: { name }, individualHooks: true }
    );

    const result = updateSetting[1];

    res.status(200).json({
      status: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
