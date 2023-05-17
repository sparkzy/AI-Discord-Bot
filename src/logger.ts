import path from "path";
import winston from "winston";

/**
 * @file This file contains fields and/or functions for the Logger.
 *
 * Configures and creates a logger using Winston.
 * The logger is set to log 'info' level messages and above.
 * It logs in JSON format and adds a default metadata { service: "ai-discord-bot" } to each log entry.
 * It writes logs to two files: 'error.log' for error-level logs, and 'combined.log' for all logs.
 * In non-production environments, it also logs to the console in a simple format.
 * The log level can be set by setting the environment variable LOG_LEVEL.
 * The deadult lkog level is 'info'.
 *
 * @author Bobbyt McGetrick
 */
function createLogger(module: NodeJS.Module): winston.Logger {
    const filename = path.basename(module.filename);
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || "info",
        format: winston.format.combine(
            winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.json(),
            winston.format.colorize()
        ),
        defaultMeta: { file: filename },
        transports: [
            new winston.transports.File({ filename: "error.log", level: "error" }),
            new winston.transports.File({ filename: "combined.log" })
        ],
    });

    if (process.env.NODE_ENV !== "production") {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    } else {
        // Do nothing
    }

    return logger;
}

export default createLogger;
