const { name } = require('./package.json');
const { resolve } = require('path');
const { cpus } = require('os');

module.exports = {
  apps: [
    {
      name,
      script: resolve(__dirname, './dist/index.js'),
      instances: cpus().length,
      watch: true,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: `./.pm2/logs/${name}-error.log`,
      out_file: `./.pm2/logs/${name}-out.log`,
      pid_file: `./.pm2/pid/${name}.pid`,
    },
  ],
};
