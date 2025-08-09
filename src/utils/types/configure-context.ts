import { Express, Router } from 'express';
import type createMailService from '../../controller/mailer';
import crypto from '../crypto';

export interface ConfigureContext {
  route: Router;
  settings: any;  // replace `any` with your actual settings type if you have one
  mailer: ReturnType<typeof createMailService>;
  crypto: typeof crypto;  

}
