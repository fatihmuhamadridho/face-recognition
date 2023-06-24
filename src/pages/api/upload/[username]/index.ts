import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const handler = nextConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: Months are zero-based
    const day = date.getDate();

    const folderPath = `./public/uploads/${req.query.username}/${day}-${month}-${year}/`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage }).single('image');

handler.post(async (req: any, res: any) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { filename, path: filePath } = req.file;

    const imagePath = String(filePath).slice(6)

    return res.status(200).json({ status: true, filename, filepath: filePath, imagePath });
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false
  }
};
