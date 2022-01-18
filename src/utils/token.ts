import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

// 生成token
export const generateToken = (payload: Record<string, any>) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60,
  });
  return token;
};

// 验证token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      console.log('verify token error', err);
      return res.json({ code: '404', msg: 'token无效' });
    }
    console.log('verify token decoded', decoded);
    next();
  });
};
