import { Message } from "discord.js";
import createLogger from "../../logger";
import Ban from "../commands/ban";
import CommandRegistry from "../commands/commandRegistry";
import Kick from "../commands/kick";
import Mute from "../commands/mute";
import Ping from "../commands/ping";
import IEvent from "./IEvent";
import IMessageQueue from "../../messaging/iMessageQueue";
import RedisMessageQueue from "../../messaging/redis";

/**
 * @file This contains file fields and/or functions for the Message event.
 *
 * Class MessageEvent represents a bot event that triggers when a message is received by the bot.
 * It implements the IEvent interface.
 *
 * This class is also responsible for initializing and registering commands, subscribing to messages 
 * from a Redis messaging queue, and handling received Discord messages. If a received Discord 
 * message starts with a command prefix, the corresponding command is executed. If not, the message 
 * is published to a Redis messaging queue.
 *
 * @author Bobby McGetrick
 */
const logger = createLogger(module);
class MessageEvent implements IEvent {
    name: string;
    private commandPrefix: string;
    private commandRegistry: CommandRegistry;
    private messageQueue: IMessageQueue;

    constructor() {
        this.name = "messageCreate";
        this.commandPrefix = process.env.COMMAND_PREFIX || "/";
        this.commandRegistry = new CommandRegistry();
        this.registerCommands();
        this.messageQueue = RedisMessageQueue.getInstance();
        this.messageQueue.subscribe("discord", (message) => {
            // Do nothing
        });
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
    async handle(message: Message) {
        logger.info("Message received! " + message.author.tag + ": " + message.content);
        if (message.author.bot) return;
        if (message.content.startsWith(this.commandPrefix)) {
            this.commandRegistry.executeCommand(message);
        } else {
            await this.messageQueue.publish("discord", message.content);
        }
    }
}

export default MessageEvent;