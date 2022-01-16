import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import routes from './routes';
import { PORT } from './config';

const app = new Koa();
const router = new Router();

routes.forEach((route) => router[route.method](route.path, route.action));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}`);
});

export default app;
