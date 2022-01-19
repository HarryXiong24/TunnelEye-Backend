import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import KoaStatic from 'koa-static';
import logger from 'koa-logger';
import json from 'koa-json';
// SQL
import options from './sql/config';
import connect from './sql/connect';
// token
import { verifyToken } from './utils/token';
import routes from './routes';

const app = new Koa();
const router = new Router();
const isDevMode = process.env.NODE_ENV === 'production' ? false : true;

routes.forEach((route) => router[route.method](route.path, route.action));

if (!isDevMode) {
  app.use(compress());
}
app.use(bodyParser());
app.use(cors());
app.use(helmet());
// 解析 json 的中间件
app.use(json());
// log 记录的中间件
app.use(logger());
app.use(KoaStatic(__dirname + '/public'));

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
