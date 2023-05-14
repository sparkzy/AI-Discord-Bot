import { Client, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import logger from "../logger"
import { intents } from "./intents";
import EventRegistry from "./events/eventRegistry";
import MessageEvent from "./events/message";
import ReactionEvent from "./events/reation";

/**
 * Class Bot represents a Discord bot.
 * It provides methods to handle the bot's operations such as 
 * starting the bot, listening to messages, and executing commands.
 * 
 * @author Bobby McGetrick
 */
export class Bot {
    private client: Client;
    private token: string;
    private eventRegistry: EventRegistry;

    /**
    * Bot constructor.
    * @param commandPrefix - The prefix that commands will start with.
    */
    constructor() {
        logger.info("Creating a Discord client...");

        this.client = new Client({ intents: intents });
        this.token = this.loadToken();
        this.eventRegistry = new EventRegistry();
        this.registerEvents();

        this.client.once("ready", this.ready.bind(this));
    }

    /**
     * Registers the bot's events to the event registry.
     */
    private registerEvents(): void {
        logger.info("Registering events...");
        this.eventRegistry.registerEvent(new MessageEvent());
        this.eventRegistry.registerEvent(new ReactionEvent());
    }

    /**
     * Loads the Discord token from the environment variables.
     * @returns The Discord token.
     * @throws An error if the DISCORD_TOKEN environment variable is not set.
     */
    private loadToken(): string {
        logger.info("Loading Discord token...");
        const discordToken = process.env.DISCORD_TOKEN;
        try {
            if (discordToken === undefined) {
                throw new Error("DISCORD_TOKEN is not set");
            }
            logger.info("Discord token: " + discordToken)
            return discordToken;
        } catch (error: any) {
            logger.error(error.message);
            process.exit(1);
        }
    }

    /**
    * Method to be called when the bot is ready. 
    * Logs a message and starts listening for messages.
    */
    private ready() {
        logger.info("Discord bot ready!");
        this.listen();
    }

    /**
     * Starts the bot by logging in using the Discord token.
     */
    public start(): void {
        this.client.login(this.token);
    }

    /**
     * Makes the bot start listening for messages.
     * When a message is received, it checks if the message starts with the command prefix,
     * and if so, it executes the command.
     */
    public listen(): void {
        logger.info("Listening for messages...");

        this.client.on('messageCreate', (message: Message) => {
            const event = this.eventRegistry.getEvent('messageCreate');
            if (event) {
                event.handle(message);
            }
        });

        this.client.on('messageReactionAdd', (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
            const event = this.eventRegistry.getEvent('messageReactionAdd');
            if (event) {
                event.handle(reaction, user);
            }
        });
    }
}

export default Bot
