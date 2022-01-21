import { Context } from 'koa';
import createCaptcha from '@/utils/captcha';
import { generateToken } from '@/utils/token';

export const getWelcome = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = 'Welcome to Tunnel-Eye Backend!';
};

export const getCaptcha = (ctx: Context) => {
  const code = createCaptcha();
  ctx.status = 200;
  ctx.type = 'svg';
  ctx.body = code.data;
};

export const doLogin = (ctx: Context) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  const token = generateToken({ username: username, password: password });
  ctx.body = {
    code: 200,
    msg: '请求成功',
    data: {
      msg: '登录成功',
      token,
    },
  };
};
