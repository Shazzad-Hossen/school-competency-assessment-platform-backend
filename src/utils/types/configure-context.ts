import { Express, Router } from 'express';

export interface ConfigureContext extends Express {
  route: Router;
  settings: any;  // replace `any` with your actual settings type if you have one
}
