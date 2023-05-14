import winston from "winston";

/**
 * Configures and creates a logger using Winston.
 * The logger is set to log 'info' level messages and above.
 * It logs in JSON format and adds a default metadata { service: "ai-discord-bot" } to each log entry.
 * It writes logs to two files: 'error.log' for error-level logs, and 'combined.log' for all logs.
 * In non-production environments, it also logs to the console in a simple format.
 */
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "ai-discord-bot" },
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;
