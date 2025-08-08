import { Request, Response } from 'express';
import { ConfigureContext } from '../../utils/types/configure-context';
import User from './user.schema'

export const createUser = ({ settings }: ConfigureContext) => async (req: Request, res: Response) => {
  try {
    const user = await User.create({name: 'Shazzad Hossen', email:'shazzad.srv@gmail.com', password: '1234'});
    
    res.send({message:'success', data: user });
  } catch {
    res.status(500).send({ message: 'Internal server error' });
  }
};
