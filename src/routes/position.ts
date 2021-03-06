import Router from '@koa/router';

// Controllers (route handlers)
import * as position from '../controllers/position';

const router = new Router();

router.get('/node', position.getNode);
router.get('/drawing', position.getDrawingInfo);
router.get('/uwbsys/ids', position.getSysId);

export default router;
