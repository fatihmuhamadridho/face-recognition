import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { Coordinate, Setting } from '@apis/models';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const resSetting = await Setting.findAll({ include: Coordinate });
    const resCoordinate = await Coordinate.findAll({ include: Setting });
    return res.status(200).json({ status: true, data: { resSetting, resCoordinate } });
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

export default handler;
