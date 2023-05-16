import Bot from "./discord/bot";
import createLogger from "./logger";

/**
 * @packageDocumentation
 *
 * @file This is the main entry point of the application.
 *
 * This application utlizes dsicord.js to create a bot that can be used
 * to manage a discord server.
 * @see https://discord.js.org/
 * It utilizes LangChaing to allow the bot to act as an assistant to the user(s)
 * of the discord server
 * @see https://js.langchain.com/docs/
 * The large language module used in this application is OpenAI's GPT-3.5
 * @see https://platform.openai.com/
 *
 * @author Bobby McGetrick
 */
const logger = createLogger(module);
function main() {
    logger.info("Running AI-Disorc-Bot...");
    const bot = new Bot();
    bot.start();
}

main();