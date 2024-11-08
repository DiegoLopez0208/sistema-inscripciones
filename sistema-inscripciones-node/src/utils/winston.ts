import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const dailyRotateFileTransport = new DailyRotateFile({
    filename: 'logs/%DATE%-combined.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d'
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        dailyRotateFileTransport,
        new winston.transports.Console({
            format: winston.format.simple()
        }),
    ],
});

export default logger;
