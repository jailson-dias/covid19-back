import winston from "winston";
import * as settings from "../settings";

const { combine, timestamp, label, printf } = winston.format;
const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toLocaleUpperCase()}: ${message}`;
});

if (!global.logger) {
  global.logger = new winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: settings.DEBUG_LEVEL,
        handleExceptions: false,
        json: false,
        prettyPrint: true,
        colorize: true,
        timestamp: true
      })
    ],
    format: combine(
      label({ label: settings.SERVICE_NAME }),
      timestamp(),
      loggerFormat
    ),
    exitOnError: false
  });
}

export default global.logger;
