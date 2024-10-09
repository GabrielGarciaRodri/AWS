const AWS = require('aws-sdk');
const QRCode = require('qrcode');

// Configurar el SDK de AWS
AWS.config.update({ region: 'us-east-1' }); // Cambia a tu región
const s3 = new AWS.S3();

// Función principal del Lambda
exports.handler = async (event) => {
    try {
        // Verificar autenticación (asumimos que API Gateway ya ha validado el token)
        
        // Obtener la URL del cuerpo de la solicitud
        const { url } = JSON.parse(event.body);
        
        // Validar la URL
        if (!isValidUrl(url)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'URL inválida' })
            };
        }
        
        // Generar código QR
        const qrCodeImage = await generateQRCode(url);
        
        // Almacenar en S3
        const s3Key = await uploadToS3(qrCodeImage);
        
        // Preparar respuesta
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'QR Code generado y almacenado con éxito',
                qrCodeBase64: qrCodeImage.split(',')[1],
                s3Key: s3Key
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    }
};

// Función para validar URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Función para generar QR code
async function generateQRCode(url) {
    return await QRCode.toDataURL(url);
}

// Función para subir a S3
async function uploadToS3(qrCodeImage) {
    const buffer = Buffer.from(qrCodeImage.split(',')[1], 'base64');
    const key = `qr-codes/${Date.now()}.png`;
    
    await s3.putObject({
        Bucket: 'tu-bucket-name', // Reemplaza con el nombre de tu bucket
        Key: key,
        Body: buffer,
        ContentType: 'image/png'
    }).promise();
    
    return key;
}