import logger from "../../logger";
import { Message } from "discord.js";
import ICommand from "./ICommand";

/**
 * Class Kick represents a bot command that kicks a user. 
 * It implements the ICommand interface.
 */
class Kick implements ICommand {
    command: string;
    commandPrefix: string;

    /**
     * Kick constructor.
     * Sets the command string that triggers this action.
     */
    constructor() {
        this.command = "kick";
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
    }

    /**
     * Handles the kick command.
     * When the kick command is triggered, the bot replies with a "Kicking a user!" message.
     * @param message - The received message.
     */
    handle(message: Message): void {
        if (message.content.trim() === `/${this.command}`) {
            message.reply("Kicking a user!");
        }
    }
}

export default Kick;