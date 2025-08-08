import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { connectDB } from './controller/mongodb';
import settings from './settings';

const deps: any = [
    { method: connectDB, args: [settings]}
];

(async () => {
  const app = new App({ deps });
  await app.start();
})();
