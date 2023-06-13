import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`);
    });
    logger.info('Database connected successfully');
  } catch (error) {
    errorLogger.error(' database error', error);
  }
}

main();
