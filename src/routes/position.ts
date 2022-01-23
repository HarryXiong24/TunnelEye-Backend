import Router from '@koa/router';

// Controllers (route handlers)
import * as position from '@/controllers/position';

const router = new Router();

router.get('/', position.getNode);

export default router;
