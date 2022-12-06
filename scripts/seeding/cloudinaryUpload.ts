import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const uploadImage = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filename,
      { resource_type: 'auto' },
      (error, result) => {
        if (error !== undefined) {
          reject(error);
        }
        resolve(result.secure_url);
      },
    );
  });
};

export const uploadImages = async (filenames: string[]) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const imageUrlByFilename: { [filename: string]: string } = {};
  for (const filename of filenames) {
    const imageUrl = await uploadImage(`${__dirname}/data/images/${filename}`);
    imageUrlByFilename[filename] = imageUrl;
  }
  return imageUrlByFilename;
};
