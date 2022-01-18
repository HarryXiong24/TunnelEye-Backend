import app from './app';
import { PORT } from './config';

/**
 * Start Express server.
 */
const server = app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log('Press CTRL-C to stop\n');
});

export default server;
