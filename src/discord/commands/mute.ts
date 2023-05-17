import { Message } from "discord.js";
import ICommand from "./ICommand";

/**
 * @file This contains file fields and/or functions for the Mute command.
 *
 * @module Discord
 *
 * Class Mute represents a bot command that mutes a user.
 * It implements the ICommand interface.
 *
 * @author Bobby McGetrick
 */
class Mute implements ICommand {
    command: string;
    commandPrefix: string;

    /**
     * Mute constructor.
     * Sets the command string that triggers this action.
     */
    constructor() {
        this.command = "mute";
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
    }

    /**
     * Handles the mute command.
     * When the mute command is triggered, the bot replies with a "Muting a user!" message.
     * 
     * @param message - The received message.
     * @todo Implement the mute command.
     */
    handle(message: Message): void {
        if (message.content.trim() === `${this.commandPrefix}${this.command}`) {
            message.reply("Muting a user!");
        }
    }
}

export default Mute;