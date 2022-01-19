import { Context } from 'koa';

export const getUserInfo = (ctx: Context) => {
  ctx.body = {
    code: 200,
    msg: '请求成功',
    data: {
      name: 'harry',
      sex: 'male',
    },
  };
};
