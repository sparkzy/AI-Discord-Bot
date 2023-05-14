import { Client, GatewayIntentBits } from "discord.js";
import logger from "../logger"
import  Ping from "./commands/ping";

export class Bot {
    private client: Client;
    private commandPrefix: string;
    private token: string
    private commands: Map<string, any>;

    constructor(commandPrefix: string) {
        logger.info("Creating a Discord client...");
        const intents = [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
        ]    

        this.client = new Client({ intents: intents});
        this.commandPrefix = commandPrefix;
        this.token = this.loadToken();
        this.commands = this.loadCommands();

        this.client.once("ready", this.ready.bind(this));
    }

    private loadCommands(): Map<string, Object> {
        logger.info("Loading commands...");
        const commands = new Map<string, Object>();
        commands.set("ping", new Ping());

        return commands
    }

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

    private ready() {
         logger.info("Discord bot ready!");
         this.listen();
    }

    public start(): void {
        this.client.login(this.token);
    }

    public listen(): void {
        logger.info("Listening for messages...");
        this.client.on('messageCreate', (message) => {
            logger.info("Message received! " + message.)
            if (message.author.bot) {
                logger.info("Message author is a bot!")
                return;
            }
            if (message.content.startsWith(this.commandPrefix)) {
                logger.info("Message starts with command prefix!")
                this.commands.get("ping")?.handle(message);
            } else {
                logger.info("Message does not start with command prefix!")
            }
        });
}
}

export default Bot
