import Router from '@koa/router';

// Controllers (route handlers)
import * as user from '../controllers/user';

const router = new Router();

router.get('/', user.getUserInfo);

export default router;
