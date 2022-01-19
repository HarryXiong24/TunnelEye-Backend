import Router from '@koa/router';

// Controllers (route handlers)
import * as login from '../controllers/login';

const router = new Router();

// get
router.get('/', login.getWelcome);

router.get('/captcha', login.getCaptcha);

// post
router.post('/login', login.doLogin);

export default router;
