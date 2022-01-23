import Router from '@koa/router';

// Controllers (route handlers)
import * as message from '@/controllers/message';

const router = new Router();

router.get('/infos', message.getInfos);
router.get('/info', message.getInfoDetail);

export default router;
