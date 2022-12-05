import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const main = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  cloudinary.uploader.upload(
    './test.png',
    { resource_type: 'auto' },
    (error, result) => {
      console.log('Result : ', result);
      console.log('Error : ', error);
    },
  );
};

main();
