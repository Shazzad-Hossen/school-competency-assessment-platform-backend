import { Request, Response } from 'express';
import { ConfigureContext } from '../../utils/types/configure-context';
import User from './user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createAllowed = new Set(['name', 'email', 'password']);

export const createUser = ({ mailer, crypto }: ConfigureContext) => async (req: Request, res: Response) => {
  try {
    const isValid = Object.keys(req.body).every(key=>createAllowed.has(key));
    if(!isValid) return res.status(400).send('Invalid body properties');
    const exist = await User.findOne({email: req.body.email});
    if(exist) return res.status(409).send('User already exist with this email');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({...req.body, password: hashedPassword});
    const otp = (Math.floor(1000 + Math.random() * 9000)).toString();
    const token = crypto.encrypt({ email: user.email, otp, expiration: Date.now() + 5 * 60_000 });


    const mailRes= await mailer({
      receiver:user.email,
      subject:'Email Verification',
      body: otp,
      type: "text",
    });
    console.log(mailRes);
    res.send({message:'success', data: token });
  } catch {
    res.status(500).send('Internal server error');
  }
};



export const signIn = ({ settings }: ConfigureContext) => async (req: Request, res: Response) => {
  try {
    const { email, password} = req.body;
    if(!email || !password) return res.status(400).send('Bad request');
    const user = await User.findOne({email: email});
    if(!user) return res.status(404).send('No user exist with this email');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid password');
    const payload = { _id: user._id }
    const accessToken = jwt.sign(payload, settings.secret, { expiresIn: settings.access_token_expiry  });
    const refreshToken = jwt.sign(payload, settings.secret, { expiresIn: settings.refresh_token_expiry  });
    
    
    res
  .cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .status(200)
  .send(user);

  } catch {
    res.status(500).send('Internal server error');
  }
};

export const getMe = () => async (req: Request, res: Response) =>res.status(200).send(req.user)
