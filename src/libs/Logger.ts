// src/utils/Logger.utils.ts

import winston from 'winston';
import chalk from 'chalk';



const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    // Capture the stack trace

    // Define colored level
    let coloredLevel: string;
    let messageData: any = '';
    switch (level) {
      case 'info':
        coloredLevel = chalk.blue(level.toUpperCase());
        messageData = chalk.blue(message);
        break;
      case 'warn':
        coloredLevel = chalk.yellow(level.toUpperCase());
        messageData = chalk.yellow(message);
        break;
      case 'error':
        coloredLevel = chalk.red(level.toUpperCase());
        messageData = chalk.red(message);
        break;
      default:
        coloredLevel = level.toUpperCase();
        messageData = message;
    }

    // Return the formatted log message
    return `${chalk.gray(timestamp)} [${coloredLevel}] - ${stack || messageData}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        logFormat
      )
    }),
    new winston.transports.File({ filename: 'application.log' })
  ],
});

export default logger;
