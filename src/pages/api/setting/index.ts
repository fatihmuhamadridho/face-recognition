import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { Setting } from '@apis/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const getAllSettings = await Setting.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({
      status: true,
      data: getAllSettings
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.parent });
  }
});

export default handler;
