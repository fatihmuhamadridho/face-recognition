import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { Coordinate } from '@apis/models';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, latitude, longitude } = req.body;
  try {
    await sequelize.authenticate();
    const response: any = await Coordinate.update(
      { name, latitude, longitude },
      { where: { name: req.query.name }, individualHooks: true }
    );

    return res.status(200).json({ status: true, data: response[1][0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

export default handler;
