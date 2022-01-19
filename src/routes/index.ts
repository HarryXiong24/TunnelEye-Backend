import Router from '@koa/router';
import login from './login';
import user from './user';
// token
import { verifyToken } from '../utils/token';

const router = new Router();

router.use('', login.routes(), login.allowedMethods());
router.use('/*', verifyToken);
router.use('/user', user.routes(), user.allowedMethods());

export default router;
