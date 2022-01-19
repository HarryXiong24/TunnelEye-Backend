import Router from '@koa/router';
import login from './login';
import user from './user';

const router = new Router();

router.use('', login.routes(), login.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

export default router;
