import Koa from 'koa';
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
// router
import router from './routes';

const app = new Koa();
const isDevMode = process.env.NODE_ENV === 'production' ? false : true;

if (!isDevMode) {
  app.use(compress());
}
app.use(cors());
app.use(bodyParser());
app.use(helmet());
// 解析 json 的中间件
app.use(json());
// log 记录的中间件
app.use(logger());
app.use(KoaStatic(__dirname + '/public'));

// SQL
connect(options);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
