import Bot from "./discord/bot"
import logger from "./logger"

function main() {
    logger.info("Running AI-Disorc-Bot...")
    const prefix = '/';
    const bot = new Bot(prefix)
    bot.start()
}

main();