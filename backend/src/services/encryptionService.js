const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV || '', 'hex');

// Add validation
// if (key.length !== 32) {
//     console.error('Invalid ENCRYPTION_KEY length: Must be 32 bytes');
//     throw new Error('Invalid ENCRYPTION_KEY configuration');
// }
// if (iv.length !== 16) {
//     console.error('Invalid ENCRYPTION_IV length: Must be 16 bytes');
//     throw new Error('Invalid ENCRYPTION_IV configuration');
// }

const encrypt = (text) => {
    if (!text) return null;
    try {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
};

const decrypt = (encryptedText) => {
    if (!encryptedText) return null;
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};

module.exports = { encrypt, decrypt };
