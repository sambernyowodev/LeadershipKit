const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
   info => `${info.timestamp} ${info.level}: ${info.message}`,
 ),
);

const transport = new DailyRotateFile({
  filename: process.env.LOG_FOLDER + process.env.APP_NAME + "-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    transport,
  ],
});

module.exports = logger;
