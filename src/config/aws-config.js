const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  region: process.env.AWS_REGION || 'us-east-1',
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
  s3BucketName: process.env.S3_BUCKET_NAME,
};