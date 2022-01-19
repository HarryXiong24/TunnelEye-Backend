import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import KoaStatic from 'koa-static';
import logger from 'koa-logger';
import json from 'koa-json';
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

// SQL
connect(options);

// 这个中间件要放在'koa-jwt'的前面
app.use(verifyToken);
// koa-jwt 中间件会获取前端请求中的token, 进行检验
app.use(
  jwt({
    secret: secretKey,
    // 不需要 token 验证的白名单
  }).unless({ path: whiteList })
);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
