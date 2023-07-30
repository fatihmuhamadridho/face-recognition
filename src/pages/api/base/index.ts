import nextConnect from 'next-connect';
import { sequelize } from '@apis/connection';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

async function baseTest() {
  return {
    status: true
  };
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const response = await baseTest();
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const response = await baseTest();
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const response = await baseTest();
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    const response = await baseTest();
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.stack });
  }
});

export default handler;
