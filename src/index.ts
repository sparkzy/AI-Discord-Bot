import Bot from "./discord/bot";
import logger from "./logger";

/**
 * This is the main entry point of the application.
 * It creates a logger and a Discord bot, and starts the bot.
 */
function main() {
    logger.info("Running AI-Disorc-Bot...");
    const bot = new Bot();
    bot.start();
}

main();