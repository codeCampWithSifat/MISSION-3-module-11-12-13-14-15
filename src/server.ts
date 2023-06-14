/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error('unCaught Exception Is Detected', error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`);
    });
    logger.info('Database connected successfully');
  } catch (error) {
    errorLogger.error(' database error', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM IS RECEIVED');
  if (server) {
    server.close();
  }
});
