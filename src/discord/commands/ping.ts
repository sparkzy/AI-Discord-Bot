import { Message } from "discord.js";
import ICommand from "./ICommand";
import { env } from "process";

/**
 * Class Ping represents a bot command that responds to a pig. 
 * It implements the ICommand interface.
 */
/**
 * @file This contains file fields and/or functions for the Ping command.
 *
 * @module Discord
 *
 * Class Ping represents a bot command that responds to a ping.
 * It implements the ICommand interface.
 *
 * @author Bobby McGetrick
 */
class Ping implements ICommand {
    command: string;
    commandPrefix: string;

    /**
     * Mute constructor.
     * Sets the command string that triggers this action.
     */
    constructor() {
        this.command = "ping";
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
    }

    /**
     * Handles the ping command.
     * When the ping command is triggered, the bot replies with a "Pong!" message.
     * 
     * @param message - The received message.
     * @todo Add latecncy of the bot to the reply.
     */
    handle(message: Message): void {
        if (message.content.trim() === `${this.commandPrefix}${this.command}`) {
            message.reply("Pong!");
        }
    }
}

export default Ping;