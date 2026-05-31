import winston from "winston";
import path from "path";
import fs from "fs";

const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const { combine, timestamp, printf, colorize } = winston.format;

const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(
    ({ timestamp, level, message }) =>
      `[${timestamp}] [${level.toUpperCase()}] ${message}`
  )
);

const onlyLevel = (targetLevel: string) =>
  winston.format((info) => (info.level === targetLevel ? info : false))();

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] [${level}] ${message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "info.log"),
      format: combine(onlyLevel("info"), fileFormat),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "test.log"),
      format: fileFormat,
    }),
  ],
});

export { logger };
