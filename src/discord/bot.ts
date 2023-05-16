import { Client, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import createLogger from "../logger";
import EventRegistry from "./events/eventRegistry";
import MessageEvent from "./events/message";
import ReactionEvent from "./events/reaction";
import { intents } from "./intents";

/**
 * @file This file contains fields and/or functions for the Bot class.
 * 
 * @see {@link https://discord.js.org/}
 *
 * Class Bot represents a Discord bot.
 * It provides methods to handle the bot's operations such as
 * starting the bot, listening to messages, and executing commands.
 *
 * @author Bobby McGetrick
 */
// const logger = createLogger(module);
export class Bot {
    logger = createLogger(module);

    private client: Client;
    private token: string;
    private eventRegistry: EventRegistry;

    /**
    * @class
    * @param client - A discord client with the desired intents for the bot. Defaults to a new client with the intents set to the intents constant.
    * @param eventRegistry - An event registry to register the bot's events.
    * @returns A new instance of the Bot class.
    */
    constructor(
        client: Client = new Client({ intents: intents }),
        eventRegistry: EventRegistry = new EventRegistry()) {
        this.logger.info("Creating a Discord client...");

        this.client = client;
        this.token = this.loadToken();
        this.eventRegistry = eventRegistry;
        this.registerEvents();

        this.client.once("ready", this.ready.bind(this));
    }

    /**
     * Registers the bot's events to the event registry.
     */
    private registerEvents(): void {
        this.eventRegistry.registerEvent(new MessageEvent());
        this.eventRegistry.registerEvent(new ReactionEvent());
    }

    /**
     * Loads the Discord token from the environment variables.
     * 
     * @returns string: The Discord token.
     * @throws An error if the DISCORD_TOKEN environment variable is not set.
     */
    private loadToken(): string {
        const discordToken = process.env.DISCORD_TOKEN;
        try {
            if (discordToken === undefined) {
                throw new Error("DISCORD_TOKEN is not set");
            }
            return discordToken;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            this.logger.error(error.message);
            return "";
        }
    }

    /**
     * Starts the bot by logging in using the Discord token.
     */
    public start(): Promise<string | void> {
        return this.client.login(this.token).then(() => this.ready());
    }

    /**
    * Method to be called when the bot is ready. 
    * Logs a message and starts listening for messages.
    */
    private ready(): void {
        this.listen();
    }

    /**
     * Makes the bot start listening for messages.
     * When a message is received, it checks if the message starts with the command prefix,
     * and if so, it executes the command.
     */
    private listen(): void {
        this.client.on("messageCreate", (message: Message) => {
            const event = this.eventRegistry.getEvent("messageCreate");
            if (event) {
                event.handle(message);
            } else {
                this.logger.error("Message event not found");
            }
        });

        this.client.on("messageReactionAdd", (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
            const event = this.eventRegistry.getEvent("messageReactionAdd");
            if (event) {
                event.handle(reaction, user);
            } else {
                this.logger.error("Reaction event not found");
            }
        });
    }
}

export default Bot;
