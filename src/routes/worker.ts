import Router from '@koa/router';

// Controllers (route handlers)
import * as worker from '@/controllers/worker';

const router = new Router();

router.get('/', worker.getPersonInfo);

export default router;
