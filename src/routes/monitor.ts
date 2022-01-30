import Router from '@koa/router';

// Controllers (route handlers)
import * as monitor from '@/controllers/monitor';

const router = new Router();

router.get('/infos', monitor.getSensors);
router.get('/info', monitor.getSensorDetail);
router.get('/data', monitor.getSensorData);

export default router;
