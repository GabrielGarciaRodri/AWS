const jwt = require('jsonwebtoken');
const { cognitoPoolId, cognitoRegion } = require('../config/aws-config');
const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider({ region: cognitoRegion });

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = jwt.decode(token, { complete: true });
    
    const params = {
      UserPoolId: cognitoPoolId,
      Username: decodedToken.payload.username
    };

    await cognito.adminGetUser(params).promise();
    
    req.user = decodedToken.payload;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };