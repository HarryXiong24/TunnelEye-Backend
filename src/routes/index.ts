import Router from '@koa/router';
import login from './login';
import position from './position';
import message from './message';

const router = new Router();

router.use('', login.routes(), login.allowedMethods());
router.use('/node', position.routes(), position.allowedMethods());
router.use('', message.routes(), message.allowedMethods());

export default router;
