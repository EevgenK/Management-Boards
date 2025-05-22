import express from 'express';
import { getEnvVar } from './utils/getEnvVar';
import pino from 'pino-http';
import {
  domainHandler,
  notFoundHandler,
  errorHandler,
} from './middlewares/index';

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
  app.get('/contacts', async (req, res) => {
    const contacts = [1, 2, 3, 4];
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
