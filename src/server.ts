/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log('unCaught Exception Is Detected', error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log(' database error', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM IS RECEIVED');
  if (server) {
    server.close();
  }
});
