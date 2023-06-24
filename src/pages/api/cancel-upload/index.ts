import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

const handler = nextConnect();

function getParentPath(imagePaths: any) {
  let parentDir = path.dirname(imagePaths[0]); // Get the parent directory of the first image path
    // Iterate through the remaining image paths and extract the common parent directory
    for (let i = 1; i < imagePaths.length; i++) {
      const imagePath = imagePaths[i];
      const currentDir = path.dirname(imagePath);
      // Find the common parent directory by comparing the current directory with the parent directory
      let j = 0;
      while (parentDir[j] === currentDir[j] && j < parentDir.length) {
        j++;
      }
      // Update the parent directory based on the common path
      parentDir = parentDir.slice(0, j);
    }

    return parentDir;
}

handler.put(async (req: any, res: any) => {
  const { images } = req.body;

  const imagePaths = images || [
    './public/uploads/pegawai/24-6-2023/2a1619b0-b943-4c4a-8bec-39bfde79c3ac-screenshot.jpg',
    './public/uploads/pegawai/24-6-2023/41b7db2b-4f09-42c0-8d2a-1b8d973ccc06-screenshot.jpg',
  ];

  try {
    const parentDir = getParentPath(imagePaths)

    fs.rmdirSync(parentDir, { recursive: true });
    // await Promise.all(imagePaths.map((imagePath) => fs.promises.unlink(imagePath)));

    return res.status(200).json({ status: true, body: 'tes', parentDir });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default handler;
