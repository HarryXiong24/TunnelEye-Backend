import app from './app';
import { PORT } from './utils/config';

// Start Express server.
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}.`);
  console.log('Press CTRL-C to stop\n');
});

export default server;
