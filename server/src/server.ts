import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import pino from 'pino-http';
import {
  domainHandler,
  notFoundHandler,
  errorHandler,
} from './middlewares/index';

import router from './routs';
import { checkCorsOrigin } from './utils/checkCorsOrigin';
import { PORT } from './constants';

const corsOptions = {
  origin: checkCorsOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

export const setupServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors(corsOptions));
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
