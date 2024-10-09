const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { generateQRCode } = require('../services/qrGenerator');
const { uploadToS3 } = require('../services/s3Service');

const router = express.Router();

router.post('/generate', verifyToken, async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validar formato de URL
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const qrCodeImage = await generateQRCode(url);
    const fileName = `qr-${Date.now()}`;
    const s3Url = await uploadToS3(qrCodeImage, fileName);

    res.json({
      message: 'QR Code generated and stored successfully',
      qrCodeBase64: qrCodeImage.split(',')[1],
      s3Url
    });
  } catch (error) {
    console.error('Error in QR generation route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = router;