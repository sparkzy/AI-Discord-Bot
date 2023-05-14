import { Message } from 'discord.js';

/**
 * Interface ICommand represents expected fields and functions of a bot command. 
 */
interface ICommand {
    command: string;
    commandPrefix: string;
    handle(message: Message): void;
}

export default ICommand;
