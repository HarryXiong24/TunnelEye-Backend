import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

export const secretKey = 'secretKey';

// 不需要 token 验证的白名单
export const whiteList = ['/', '/login', '/captcha', '/ip'];

// 生成token
export const generateToken = (payload: Record<string, any>) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60,
  });
  return 'Bearer ' + token;
};

// 自定义的权限错误处理, 当然这是特殊的业务需求
export async function verifyToken(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    // 由 koa-jwt 抛出的错误
    if (err.status === 401) {
      // 强制修改网络状态, 在接口中返回业务类型状态码(根据需求)
      ctx.status = 200;
      ctx.body = { code: 0, msg: '无效 token' };
    } else {
      throw err;
    }
  }
}
