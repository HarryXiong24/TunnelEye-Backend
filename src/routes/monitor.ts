import Router from '@koa/router';

// Controllers (route handlers)
import * as monitor from '@/controllers/monitor';

const router = new Router();

router.get('/infos', monitor.getInfos);
router.get('/info', monitor.getInfoDetail);

export default router;
