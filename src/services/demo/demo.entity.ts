import { Request, Response } from 'express';
import { ConfigureContext } from '../../utils/types/configure-context';

export const getDemoStatus = ({ settings }: ConfigureContext) => async (req: Request, res: Response) => {
  try {
    res.send({ status: 'ok' });
  } catch {
    res.status(500).send({ message: 'Internal server error' });
  }
};
