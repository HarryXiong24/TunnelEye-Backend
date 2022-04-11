import { Context } from 'koa';
import createCaptcha from '../utils/captcha';
import { generateToken } from '../utils/token';
import { CaptchaObj } from 'svg-captcha';
import SQLQuery from '../sql/query';

let code: CaptchaObj = { text: '', data: '' };

export const getWelcome = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = 'Welcome to Tunnel-Eye Backend!';
};

export const getCaptcha = (ctx: Context) => {
  code = createCaptcha();
  ctx.status = 200;
  ctx.type = 'svg';
  ctx.body = code.data;
};

export const doLogin = async (ctx: Context) => {
  const username = ctx.request.body.username as string;
  const password = ctx.request.body.password as string;
  const captcha = (ctx.request.body.captcha as string).toLowerCase();
  let flag = 0;

  if (captcha !== code.text.toLowerCase()) {
    ctx.body = { msg: '验证码错误', success: false };
    return;
  }

  try {
    const sql = 'select * from userinfo';
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    // console.log(data);
    data.forEach((value) => {
      console.log(value.loginname, value.pass, value.loginname === username && value.pass === password);
      if (value.loginname === username && value.pass === password) {
        flag = 1;
        const token = generateToken({ username: username, password: password });
        ctx.body = {
          msg: '登陆成功',
          success: true,
          token,
          user: value,
        };
      }
    });

    if (flag === 0) {
      ctx.body = {
        msg: '用户名或密码错误',
        success: false,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
