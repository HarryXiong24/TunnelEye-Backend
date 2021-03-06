import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import KoaStatic from 'koa-static';
import logger from 'koa-logger';
import json from 'koa-json';
import onerror from 'koa-onerror';
// token
import jwt from 'koa-jwt';
import { secretKey, verifyToken, whiteList } from './utils/token';
// SQL
import options from './sql/config';
import connect from './sql/connect';
// router
import router from './routes';

const app = new Koa();

app.use(compress());
app.use(cors());
app.use(bodyParser());
// 网络安全
app.use(helmet());
// 解析 json 的中间件
app.use(json());
// log 记录的中间件
app.use(logger());
// 处理静态资源
app.use(KoaStatic(__dirname + '/public'));
// 告诉 Koa-onerror 我们需要捕获所以服务端实例对象的错误
onerror(app);

// SQL
const mysql = connect(options);
// 将 mysql 对象注册到 context 中
app.context.mysql = mysql;

// 这个中间件要放在'koa-jwt'的前面
app.use(verifyToken);
// koa-jwt 中间件会获取前端请求中的token, 进行检验
app.use(
  jwt({
    secret: secretKey,
    // 不需要 token 验证的白名单
  }).unless({ path: whiteList })
);

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 处理错误
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.body = err.message;
  }
});

export default app;
