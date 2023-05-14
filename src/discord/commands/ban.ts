import logger from "../../logger"
import { Message } from "discord.js";
import ICommand from "./ICommand";

/**
 * Class Ban represents a bot command that bans a user. 
 * It implements the ICommand interface.
 */
class Ban implements ICommand {
    command: string;
    commandPrefix: string;

    /**
     * Ban constructor.
     * Sets the command string that triggers this action.
     */
    constructor() {
        this.command = "ban";
        this.commandPrefix = process.env.COMMAND_PREFIX || '/';
    }

    /**
     * Handles the ban command.
     * When the ban command is triggered, the bot replies with a 'Baning a user!' message.
     * @param message - The received message.
     */
    handle(message: Message): void {
        if (message.content.trim() === `${this.commandPrefix}${this.command}`) {
            message.reply('Baning a user!');
        }
    }
}

export default Ban;