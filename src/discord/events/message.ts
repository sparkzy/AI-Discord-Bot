import IEvent from "./IEvent";
import { Message } from "discord.js";
import logger from "../../logger";
import CommandRegistry from "../commands/commandRegistry";
import Ping from "../commands/ping";
import Mute from "../commands/mute";
import Ban from "../commands/ban";
import Kick from "../commands/kisk";

/**
 * Class MessageEvent represents a bot event that triggers when a message is received by the bot. 
 * It implements the IEvent interface.
 */
class MessageEvent implements IEvent {
    name: string;
    private commandPrefix: string = process.env.COMMAND_PREFIX || "/";
    private commandRegistry: CommandRegistry;

    constructor() {
        this.name = "messageCreate";
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
        this.commandRegistry = new CommandRegistry();
        this.registerCommands();
    }


    /**
         * Registers the bot"s commands to the command registry.
         */
    private registerCommands(): void {
        logger.info("Registering commands...");
        this.commandRegistry.registerCommand(new Ping());
        this.commandRegistry.registerCommand(new Mute());
        this.commandRegistry.registerCommand(new Ban());
        this.commandRegistry.registerCommand(new Kick());
    }

    handle(message: Message) {
        logger.info("Message received! " + message.author.tag + ": " + message.content);
        if (message.author.bot) return;
        if (message.content.startsWith(this.commandPrefix)) {
            this.commandRegistry.executeCommand(message);
        }
    }
}

export default MessageEvent;