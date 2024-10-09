const AWS = require('aws-sdk');
const { s3BucketName } = require('../config/aws-config');

const s3 = new AWS.S3();

const uploadToS3 = async (qrCodeImage, fileName) => {
  const buffer = Buffer.from(qrCodeImage.split(',')[1], 'base64');
  const params = {
    Bucket: s3BucketName,
    Key: `qr-codes/${fileName}.png`,
    Body: buffer,
    ContentType: 'image/png'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload to S3');
  }
};

module.exports = { uploadToS3 };