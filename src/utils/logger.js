import winston from "winston";
import { DEBUG_LEVEL } from "../settings";

winston.emitErrs = true;

if (!global.logger) {
  global.logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: DEBUG_LEVEL,
        handleExceptions: false,
        json: false,
        prettyPrint: true,
        colorize: true,
        timestamp: true
      })
    ],
    exitOnError: false
  });
}

export default global.logger;
