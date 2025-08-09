import cryptoLib from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import settings from '../settings';

const [KEY, IV] = settings.secret.split(':');
if(!KEY || !IV) throw new Error('SECRET must be in the format "key:iv"');


interface JwtData extends JwtPayload {
  [key: string]: any;
}

const crypto = {
  encrypt: (data: any): string | null => {
    try {
      const encodedData = jwt.sign(data, settings.secret);
      const cipher = cryptoLib.createCipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), Buffer.from(IV, 'hex'));
      let encrypted = cipher.update(encodedData, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      console.error(error);
      return null;
    }

  },

  decrypt: (encryptedText: string): JwtData | null => {
    try {
      const decipher = cryptoLib.createDecipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), Buffer.from(IV, 'hex'));
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      const decodedData = jwt.verify(decrypted, settings.secret) as JwtData;
      return decodedData;
    } catch (error) {
      console.error(error);
      return null;
    }

  }
};

export default crypto;

// // Use this block once to generate the secret and then comment it out!
// (() => {
//   const key = cryptoLib.randomBytes(32).toString('hex');
//   const iv = cryptoLib.randomBytes(16).toString('hex');
//   console.log({ SECRET: key + ':' + iv });
// })();
