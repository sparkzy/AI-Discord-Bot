import { Message } from "discord.js";
import ICommand from "./ICommand";

/**
 * @file This contains file fields and/or functions for the Ban command.
 *
 * Class Ban represents a bot command that bans a user.
 * It implements the ICommand interface.
 *
 * @author Bobby McGetrick
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
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
    }

    /**
     * Handles the ban command.
     * When the ban command is triggered, the bot replies with a 'Baning a user!' message.
     * 
     * @param message - The received message.
     * @todo Implement the ban command.
     */
    handle(message: Message): void {
        if (message.content.trim() === `${this.commandPrefix}${this.command}`) {
            message.reply("Baning a user!");
        }
    }
}

export default Ban;