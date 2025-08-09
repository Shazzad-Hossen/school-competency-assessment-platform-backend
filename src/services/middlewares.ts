import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from '../services/user/user.schema';
import settings from "../settings";


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const verifyJwt = (token: string)=>{
    try { return jwt.verify(token, settings.secret); } 
    catch { return null; }

}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) return res.status(401).send("Unauthorized");
    let userId: string | undefined;

    const decodedAccessToken = verifyJwt(accessToken);
    if (decodedAccessToken && typeof decodedAccessToken !== "string" && '_id' in decodedAccessToken) userId = decodedAccessToken._id; 
    else {
      const decodedRefreshToken = verifyJwt(refreshToken);
      if (!decodedRefreshToken || typeof decodedRefreshToken === "string" || !('_id' in decodedRefreshToken)) return res.status(401).send("Unauthorized");
      userId =decodedRefreshToken._id;
      const newAccessToken = jwt.sign({_id: userId }, settings.secret, { expiresIn: settings.access_token_expiry });
      res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: "none" });
    }
  
    req.user = await User.findById(userId);
    if(!req.user)  return res.status(401).send("Unauthorized");
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
    
  }
};
