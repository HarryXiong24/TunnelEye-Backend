import Router from '@koa/router';
import login from './login';
import position from './position';

const router = new Router();

router.use('', login.routes(), login.allowedMethods());
router.use('/node', position.routes(), position.allowedMethods());

export default router;
