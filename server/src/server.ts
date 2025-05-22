import express from 'express';
import { getEnvVar } from './utils/getEnvVar';
import pino from 'pino-http';
import {
  domainHandler,
  notFoundHandler,
  errorHandler,
} from './middlewares/index';

import router from './routs';

const PORT = Number(getEnvVar('PORT', '4000'));
export const setupServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    }),
  );

  app.get('/', domainHandler);
  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
