import { Message } from "discord.js";

/**
 * @file This contains file fields and/or functions for the ICommand.
 *
 * @module Discord
 *
 * Interface ICommand represents expected fields and functions of a bot command.
 *
 * @author Bobby McGetrick
 */
interface ICommand {
    command: string;
    commandPrefix: string;
    handle(message: Message): void;
}

export default ICommand;
