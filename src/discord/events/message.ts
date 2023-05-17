import { Message } from "discord.js";
import createLogger from "../../logger";
import Ban from "../commands/ban";
import CommandRegistry from "../commands/commandRegistry";
import Kick from "../commands/kick";
import Mute from "../commands/mute";
import Ping from "../commands/ping";
import IEvent from "./IEvent";

/**
 * @file This contains file fields and/or functions for the Message event.
 *
 * @module Discord
 *
 * Class MessageEvent represents a bot event that triggers when a message is received by the bot.
 * It implements the IEvent interface.
 *
 * @author Bobby McGetrick
 */
const logger = createLogger(module);
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

    /**
     * Handles the message event.
     * If the message is from a bot, it is ignored.
     * If the message starts with the command prefix, the command is executed.
     * @todo Add response for non-command messages sent from non-bots.
     *
     * @param param description
     * @returns description
     */
    handle(message: Message) {
        logger.info("Message received! " + message.author.tag + ": " + message.content);
        if (message.author.bot) return;
        if (message.content.startsWith(this.commandPrefix)) {
            this.commandRegistry.executeCommand(message);
        }
    }
}

export default MessageEvent;